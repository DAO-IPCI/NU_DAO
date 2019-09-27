# -*- coding: utf-8 -*-

import asyncio
import time
from configparser import ConfigParser
from functools import reduce
from os import environ
import logging
import json
import random

import motor.motor_asyncio
import pymongo
from web3 import Web3, WebsocketProvider


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

config = ConfigParser()
config.read("nudao.cfg")

DATABASE_URI = config.get("database", "connection_string")
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


db = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)[DATABASE_NAME]

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
Robonomics_Factory_contract = w3.eth.contract(ROBONOMICS_FACTORY_CONTRACT_ADDRESS, abi=Robonomics_Factory_abi)

with open("./contracts/RobonomicsLiability.json") as Liability_abi_file:
    Robonomics_Liability_abi = json.load(Liability_abi_file)


def get_nudaokzt_balance(address: str):
    """TODO: this may block for too long, better to invoke bulk in process executor
    """
    return NUDAOKZT_contract.functions.balanceOf(address).call() / NUDAOKZT_decimals


async def get_member_id_by_ethereum_address(address: str) -> int:
    return (await db.members.find({"ethereum_address": address}))["id"]


async def financial_balances_updater(update_period):
    logger.info("Starting financial balance updater")
    await asyncio.sleep(random.uniform(1.0, 2.0))
    while True:
        logger.debug("Updating financial balances...")
        await asyncio.sleep(random.uniform(0.1, 0.5))
        members = await db.members.find({}, {"id": 1, "ethereum_address": 1, "_id": 0}).to_list(length=10000)
        for member in members: # heavy
            balance = get_nudaokzt_balance(member["ethereum_address"])
            await db.ipci.update_one(
                {"member_id": member["id"]},
                {"$set": {"member_id": member["id"], "financial_balance": balance}},
                upsert=True
            )
        await asyncio.sleep(update_period)


async def carbon_units_burn_operations_updater(update_period):
    """Store carbon units burn operations in database
    """
    logger.info("Starting burn operations updater")
    await asyncio.sleep(random.uniform(1.0, 2.0))
    while True:
        logger.debug("Updating burn operations...")
        await asyncio.sleep(random.uniform(0.1, 0.5))

        # Read all members Ethereum addresses to list
        members = await db.members.find({}, {"id": 1, "ethereum_address": 1, "_id": 0}).to_list(length=10000)
        members_ethereum_addresses = list()
        for member in members:
            members_ethereum_addresses.append(member["ethereum_address"])

        # Read all NewLiability events, some of them maybe related to GCT burn service
        new_liability_events = Robonomics_Factory_contract.events.NewLiability().createFilter(
            fromBlock=FROM_BLOCK # from game start block
        ).get_all_entries()

        # Reading each event if it is GCT burn service
        for event in new_liability_events:
            await asyncio.sleep(random.uniform(0.1, 0.5))
            # Take liability contract by address in event
            new_liability_addr = event.args.liability
            Robonomics_Liability_contract = w3.eth.contract(new_liability_addr, abi=Robonomics_Liability_abi)

            # Proceed if a model is for GCT Burn service #TODO: skip if model is not our
            model = Robonomics_Liability_contract.functions.model().call()

            # Proceed if GCT burned for NU DAO member
            promisee = Robonomics_Liability_contract.functions.promisee().call()
            if promisee in members_ethereum_addresses:
                cost = float(Robonomics_Liability_contract.cost().call())  # payment for burn service
                vcu_address = "0x0e6C2626C51b74557C0F98A73d2Aa0EA834e98C7"  # GCT #TODO: get GCT from objective / result
                operation = dict(  # operation data to store in database, #TODO: read it from objective / result rosbag
                    liability_addr = new_liability_addr,
                    block_number = event.blockNumber,
                    value = cost / GCTNUDAOKZT
                )

                # Update or insert to db if the operation is not aleady written
                member_id = get_member_id_by_ethereum_address(promisee)

                document = await db.ipci.find_one_and_update(
                    {"member_id": member_id},
                    {"$set": {"member_id": member_id}},
                    upsert=True,
                    return_document=pymongo.ReturnDocument.AFTER                    
                )

                if (await db.ipci.find_one({"_id": document["_id"], "burn_operations.vcu_address": vcu_address})):
                    await db.ipci.update_one(
                        {"_id": document["_id"], "burn_operations.vcu_address": vcu_address},
                        {"$addToSet": {
                                "burn_operations.$.operations": operation
                        }},
                        upsert=True,
                    )
                else:
                    await db.ipci.update_one(
                        {"_id": document["_id"]},
                        {"$push": {
                            "burn_operations": operation
                        }},
                        upsert=True
                    )

        await asyncio.sleep(update_period)


async def carbon_units_emission_operations_updater(update_period):
    logger.info("Starting emission operations updater")
    await asyncio.sleep(random.uniform(1.0, 2.0))
    while True:
        logger.debug("Updating emission operations...")
        await asyncio.sleep(random.uniform(0.1, 0.5))
        members = await db.members.find({}, {"id": 1, "ethereum_address": 1, "_id": 0}).to_list(length=10000)
        for member in members:
            emission_operations = list()
            decimals = 10 ** GCT_contract.functions.decimals().call()
            emission_events = GCT_contract.events.Transfer().createFilter(
                fromBlock=1,
                argument_filters={"from": "0x0000000000000000000000000000000000000000"} # "to" all
            ).get_all_entries()

            operations = list()
            for event in emission_events:
                operations.append(dict(
                    transaction_hash = repr(event.transactionHash),
                    block_hash = repr(event.blockHash),
                    block_number = event.blockNumber,
                    value = event.args.value / decimals
                ))

            emission_operations.append(dict(
                vcu_address = GCT_contract.address,
                operations = operations
            ))

            await db.ipci.update_one(
                {"member_id": member["id"]},
                {"$set":
                    {
                        "member_id": member["id"],
                        "emission_operations": emission_operations
                    }
                },
                upsert=True
            )
            await asyncio.sleep(random.uniform(0.1, 0.5))
        await asyncio.sleep(update_period)


if __name__ == "__main__":
    logger.info("Starting IPCI poller")
    loop = asyncio.get_event_loop()
    try:
        loop.create_task(financial_balances_updater(UPDATE_PERIOD))
        loop.create_task(carbon_units_burn_operations_updater(UPDATE_PERIOD))
        loop.create_task(carbon_units_emission_operations_updater(UPDATE_PERIOD))
        loop.run_forever()
    finally:
        loop.close()
