# -*- coding: utf-8 -*-

import time
from configparser import ConfigParser
from functools import reduce
from os import environ
import logging
import json

import pymongo
from web3 import Web3, WebsocketProvider


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

config = ConfigParser()
config.read("nudao.cfg")

DATABASE_PREFIX = config.get("database", "connection_prefix")
DATABASE_ADDRESS = config.get("database", "connection_address")
DATABASE_NAME = config.get("database", "name")

ETHEREUM_NETWORK = config.get("ipci", "network")
ETHEREUM_NETWORK_IS_POA = config.get("ipci", "is_poa")
NUDAOKZT_CONTRACT_ADDRESS = config.get("ipci", "NUDAOKZT_contract_address")
GCT_CONTRACT_ADDRESS = config.get("ipci", "GCT_contract_address")
ROBONOMICS_FACTORY_CONTRACT_ADDRESS = config.get("ipci", "Robonomics_Factory_contract_address")
UPDATE_PERIOD = float(config.get("ipci", "update_period_sec"))
FROM_BLOCK = int(config.get("ipci", "from_block"))
GCTNUDAOKZT = float(config.get("ipci", "GCTNUDAOKZT"))

INFURA_PROJECT_ID = environ["INFURA_PROJECT_ID"]
WEB3_WSS_PROVIDER = environ["WEB3_WSS_PROVIDER"]

DATABASE_URI = f"{DATABASE_PREFIX}{environ['DATABASE_USER']}:{environ['DATABASE_PWD']}@{DATABASE_ADDRESS}"
db = pymongo.MongoClient(DATABASE_URI)[DATABASE_NAME]


if WEB3_WSS_PROVIDER:
    web3_wss_provider = f"ws://{WEB3_WSS_PROVIDER}"
else:
    web3_wss_provider = f"wss://{ETHEREUM_NETWORK}.infura.io/ws/v3/{INFURA_PROJECT_ID}"
logger.info(f"Using web3 provider: {web3_wss_provider}")

wss_provider = WebsocketProvider(web3_wss_provider, websocket_kwargs={"timeout": 60})
w3 = Web3(wss_provider)
if ETHEREUM_NETWORK_IS_POA == "True":
    from web3.middleware import geth_poa_middleware
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# NU DAO Tenge payment token
with open("./contracts/NUDAOKZT.json", "r") as NUDAOKZT_abi_file:
    NUDAOKZT_abi = json.load(NUDAOKZT_abi_file)
NUDAOKZT_contract = w3.eth.contract(NUDAOKZT_CONTRACT_ADDRESS, abi=NUDAOKZT_abi)
NUDAOKZT_decimals = 10 ** NUDAOKZT_contract.functions.decimals().call()

# Green Certificate Token
with open("./contracts/GCT.json", "r") as GCT_abi_file:
    GCT_abi = json.load(GCT_abi_file)
GCT_contract = w3.eth.contract(GCT_CONTRACT_ADDRESS, abi=GCT_abi)

# Robonomics contracts to reach mitigation proxy service
with open("./contracts/RobonomicsFactory.json") as Factory_abi_file:
    Robonomics_Factory_abi = json.load(Factory_abi_file)
Robonomics_Factory_contract = w3.eth.contract(
        ROBONOMICS_FACTORY_CONTRACT_ADDRESS,
        abi=Robonomics_Factory_abi
    )

with open("./contracts/RobonomicsLiability.json") as Liability_abi_file:
    Robonomics_Liability_abi = json.load(Liability_abi_file)


def get_member_id_by_ethereum_address(address: str) -> int:
    """Works while members have unique Ethereum addresses
    """
    return db.members.find_one({"ethereum_address": address})["id"]


def update_financial_balances():
    logger.info("Updating financial balances...")
    members = db.members.find({}, {"_id": 0, "id": 1, "ethereum_address": 1})
    for member in members:
        logger.debug(f"Updating {member}")
        balance = NUDAOKZT_contract.functions.balanceOf(
                member["ethereum_address"]
            ).call() / NUDAOKZT_decimals
        db.ipci.update_one(
                {"member_id": member["id"]},
                {"$set": {"member_id": member["id"], "financial_balance": balance}},
                upsert=True
            )


def update_carbon_units_burn_operations():
    logger.info("Updating carbon units burn operations...")
    members = db.members.find({}, {"_id": 0, "id": 1, "ethereum_address": 1})
    members_ethereum_addresses = [member["ethereum_address"] for member in members]

    # Read all NewLiability events, some of them maybe related to GCT burn service
    new_liability_events = Robonomics_Factory_contract.events.NewLiability().createFilter(
            fromBlock=FROM_BLOCK  # game start block
        ).get_all_entries()

    # Reading each event if it is GCT burn service
    for event in new_liability_events:
        logger.debug(f"Processing event {event}")
        new_liability_addr = event.args.liability
        Robonomics_Liability_contract = w3.eth.contract(
                new_liability_addr, abi=Robonomics_Liability_abi
            )
        model = Robonomics_Liability_contract.functions.model().call()  # TODO: skip wrong model
        promisee = Robonomics_Liability_contract.functions.promisee().call()
        if not promisee in members_ethereum_addresses:  # skip if not a player
            continue

        # payment for burn service
        cost = float(Robonomics_Liability_contract.functions.cost().call())

        # GCT addr
        vcu_address = "0x0e6C2626C51b74557C0F98A73d2Aa0EA834e98C7"

        operation = dict(
                liability_addr = new_liability_addr,
                block_number = event.blockNumber,
                value = cost / GCTNUDAOKZT
            )

        member_id = get_member_id_by_ethereum_address(promisee)

        document = db.ipci.find_one_and_update(  # upsert a document for this member_id
                {"member_id": member_id},
                {"$set": {"member_id": member_id}},
                upsert=True,
                return_document=pymongo.ReturnDocument.AFTER
            )

        exists = bool(db.ipci.find_one(
                {"_id": document["_id"], "burn_operations.vcu_address": vcu_address})
            )
        if exists:
            db.ipci.update_one(
                    {"_id": document["_id"], "burn_operations.vcu_address": vcu_address},
                    {"$addToSet":
                        {"burn_operations.$.operations": operation}
                    },
                    upsert=True,
                )
        else:
            db.ipci.update_one(
                    {"_id": document["_id"]},
                    {"$push":
                        {"burn_operations": operation}
                    },
                    upsert=True
                )


def update_all():
    logger.info("Updating data...")
    update_financial_balances()
    update_carbon_units_burn_operations()


if __name__ == "__main__":
    logger.info("Starting IPCI data updater")
    logger.info(f"Provider latest block is: {w3.eth.blockNumber}")
    while True:
        try:
            update_all()
        except Exception as e:
            logger.error(f"Error occured: {e}")
        time.sleep(UPDATE_PERIOD)
