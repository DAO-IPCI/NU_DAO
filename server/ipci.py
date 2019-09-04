# -*- coding: utf-8 -*-

from configparser import ConfigParser
from os import environ
import json

from web3 import Web3, WebsocketProvider


config = ConfigParser()
config.read("nudao.cfg")

ETHEREUM_NETWORK = config.get("ipci", "network")
ETHEREUM_NETWORK_IS_POA = config.get("ipci", "is_poa")
MITO_CONTRACT_ADDRESS = config.get("ipci", "MITO_contract_address")

INFURA_PROJECT_ID = environ["INFURA_PROJECT_ID"]


web3_wss_provider = f"wss://{ETHEREUM_NETWORK}.infura.io/ws/v3/{INFURA_PROJECT_ID}"
wss_provider = WebsocketProvider(web3_wss_provider)
w3 = Web3(wss_provider)
if ETHEREUM_NETWORK_IS_POA == "True":
    from web3.middleware import geth_poa_middleware
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)

with open("../contracts/MITO.json", "r") as MITO_abi_file:
    MITO_abi = json.load(MITO_abi_file)
MITO_contract = w3.eth.contract(MITO_CONTRACT_ADDRESS, abi=MITO_abi)
MITO_decimals = 10 ** MITO_contract.functions.decimals().call()


async def get_mito_balance(address: str):
    """TODO: this may block for too long, better to invoke in process executor
    """
    return MITO_contract.functions.balanceOf(address).call() / MITO_decimals


async def get_mitigated_emission(address: str):
    return NotImplementedError()
