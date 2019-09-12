# -*- coding: utf-8 -*-

import asyncio
from configparser import ConfigParser
from functools import reduce
from os import environ
import logging
import json

import motor.motor_asyncio
from web3 import Web3, WebsocketProvider


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

config = ConfigParser()
config.read("nudao.cfg")

DATABASE_URI = config.get("database", "connection_string")
DATABASE_NAME = config.get("database", "name")

ETHEREUM_NETWORK = config.get("ipci", "network")
ETHEREUM_NETWORK_IS_POA = config.get("ipci", "is_poa")
MITO_CONTRACT_ADDRESS = config.get("ipci", "MITO_contract_address")
VCU_CONTRACT_ADDRESS = config.get("ipci", "VCU_contract_address")
UPDATE_PERIOD = float(config.get("ipci", "update_period_sec"))

INFURA_PROJECT_ID = environ["INFURA_PROJECT_ID"]


db = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)[DATABASE_NAME]

web3_wss_provider = f"wss://{ETHEREUM_NETWORK}.infura.io/ws/v3/{INFURA_PROJECT_ID}"
wss_provider = WebsocketProvider(web3_wss_provider)
w3 = Web3(wss_provider)
if ETHEREUM_NETWORK_IS_POA == "True":
    from web3.middleware import geth_poa_middleware
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)

with open("./contracts/MITO.json", "r") as MITO_abi_file:
    MITO_abi = json.load(MITO_abi_file)
MITO_contract = w3.eth.contract(MITO_CONTRACT_ADDRESS, abi=MITO_abi)
MITO_decimals = 10 ** MITO_contract.functions.decimals().call()

with open("./contracts/VCU.json", "r") as VCU_abi_file:
    VCU_abi = json.load(VCU_abi_file)
VCU_contract = w3.eth.contract(VCU_CONTRACT_ADDRESS, abi=VCU_abi)
VCU_decimals = 10 ** VCU_contract.functions.decimals().call()


def get_mito_balance(address: str):
    """TODO: this may block for too long, better to invoke bulk in process executor
    """
    return MITO_contract.functions.balanceOf(address).call() / MITO_decimals


def get_carbon_units_burned(address: str):
    """TODO: this may block for too long, better to invoke bulk in process executor
       TODO: it reads full list of events each call, better to cash value & block to query only new
    """
    burn_events = VCU_contract.events.Transfer().createFilter(
        fromBlock=1,
        argument_filters={"from": address, "to": "0x0000000000000000000000000000000000000000"}
    ).get_all_entries()
    burned = reduce(lambda prev, ev: prev + ev["args"]["value"], burn_events, 0) / VCU_decimals
    return burned


async def financial_balances_updater(update_period):
    logger.info("Starting financial balance updater")
    while True:
        logger.debug("Updating financial balances...")
        members = await db.members.find({}, {"id": 1, "ethereum_address": 1, "_id": 0}).to_list(length=10000)
        for member in members: # heavy
            balance = get_mito_balance(member["ethereum_address"])
            await db.ipci.update_one(
                {"member_id": member["id"]},
                {"$set": {"member_id": member["id"], "financial_balance": balance}},
                upsert=True
            )
        await asyncio.sleep(update_period)


async def carbon_units_burned_updater(update_period):
    logger.info("Starting carbon units burned updater")
    while True:
        logger.debug("Updating carbon units burned...")
        members = await db.members.find({}, {"id": 1, "ethereum_address": 1, "_id": 0}).to_list(length=10000)
        for member in members: # heavy
            units_burned = get_carbon_units_burned(member["ethereum_address"])
            await db.ipci.update_one(
                {"member_id": member["id"]},
                {"$set": {"member_id": member["id"], "vcu_burned": units_burned}},
                upsert=True
            )
        await asyncio.sleep(update_period)


if __name__ == "__main__":
    logger.info("Starting IPCI poller")
    loop = asyncio.get_event_loop()
    try:
        loop.create_task(financial_balances_updater(UPDATE_PERIOD))
        loop.create_task(carbon_units_burned_updater(UPDATE_PERIOD))
        loop.run_forever()
    finally:
        loop.close()
