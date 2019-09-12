# -*- coding: utf-8 -*-

import configparser
from datetime import datetime
import logging
from typing import List

from fastapi import FastAPI, Query, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import motor.motor_asyncio


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

config =  configparser.ConfigParser()
config.read("nudao.cfg")

DATABASE_URI = config.get("database", "connection_string")
DATABASE_NAME = config.get("database", "name")
TCO2_IN_ONE_VCU = float(config.get("ipci", "tCO2_in_one_VCU"))

mongodb_client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)
db = mongodb_client[DATABASE_NAME]


class ConsumptionRecord(BaseModel):
    member_id: int
    member_name: str
    consumption: int


class ConsumptionReport(BaseModel):
    month: str
    author: str
    records: List[ConsumptionRecord]
    

app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)


@app.on_event("startup")
async def startup():
    logger.info("Starting NU DAO server...")


@app.on_event("shutdown")
async def shutdown():
    logger.info("Shutdown NU DAO data server...")


@app.get("/api/v1/members")
async def read_members():
    members = await db.members.find({}, {'_id': False}).to_list(length=10000)
    logger.debug(f"Members:\n{members}")
    return members


async def _get_consumption_reports(month: None) -> list:
    reports = list()
    if month: # return specific
        report = await db.reports.find_one({"month": month})
        if not report:
            return None
        reports.append(report)
    else: # return all
        reports = await db.reports.find({}, {'_id': False, "author": False}).to_list(length=10000)
    for rep in reports:
        for rec in rep["records"]:
            del rec["member_name"]
    return reports


async def calc_ghg_emission(electricity_consumption_wth, emission_factor):
    return electricity_consumption_wth * emission_factor


def vcu_to_tco2(vcu):
    return vcu * TCO2_IN_ONE_VCU  # tCO2


@app.get("/api/v1/members/electricity/consumptions")
async def read_electricity_consumptions(month = Query(None, regex="^\d\d/\d{4}$")):
    logger.info(f"Reading {month if month else 'all'} consupmtions")
    consumptions = await _get_consumption_reports(month)
    if not consumptions:
        raise HTTPException(status_code=204)
    return consumptions


@app.post("/api/v1/members/electricity/consumptions")
async def create_report(report: ConsumptionReport):
    now = datetime.now()
    logger.info(f"New report from {report.author} with {len(report.records)} records")
    logger.info(f"{report.dict()}")
    await db.reports.insert_one(report.dict())
    return


@app.get("/api/v1/members/ghg/balances")
async def read_ghg_balances(month = Query(..., regex="^\d\d/\d{4}$"), mitigated: bool = True):
    logger.info(f"Reading {month} GHG balances")

    actual_report = await _get_consumption_reports(month)
    if not actual_report:
        raise HTTPException(status_code=204)
    actual_report = actual_report[0]

    base_year = (await db.misc.find_one({"name": "settings"}))["base_year"]
    base_month = "/".join([month[:2], base_year])
    base_report = await db.reports.find_one({"month": base_month})

    emission_factor = (await db.misc.find_one({"name": "settings"}))["emission_factor"]
    ghg_balances = {"month": month, "base": base_month, "balances": list()}

    for record in actual_report["records"]:
        member_id = record["member_id"]
        actual_consumption = record["consumption"]
        base_consumption = next(r for r in base_report["records"] if r["member_id"] == member_id)["consumption"]  # bad
        balance = (base_consumption - actual_consumption) * emission_factor
        if mitigated:
            vcu_burned = (await db.ipci.find_one({"member_id": member_id}, {"vcu_burned": 1}))["vcu_burned"] # VCU
            ghg_mitigated = vcu_burned * vcu_to_tco2(vcu_burned) # tCO2
            balance -= ghg_mitigated
        ghg_balances["balances"].append({"member_id": member_id, "balance": balance})
    return ghg_balances


@app.get("/api/v1/members/ghg/emissions")
async def read_ghg_emissions(month = Query(None, regex="^\d\d/\d{4}")):
    logger.info(f"Reading {month if month else 'all'} consupmtions")
    consumption_reports = await _get_consumption_reports(month)
    if not consumption_reports:
        raise HTTPException(status_code=204)
    emission_factor = (await db.misc.find_one({"name": "settings"}))["emission_factor"]
    for rep in consumption_reports:
        for rec in rep["records"]:
            rec.update({"ghg_emission": rec["consumption"] * emission_factor})
            del rec["consumption"]
    ghg_emissions = consumption_reports
    return ghg_emissions


@app.get("/api/v1/members/finance/balances")
async def read_financial_balances():
    balances = await db.ipci.find({}, {"member_id": 1, "financial_balance": 1, "_id": 0}).to_list(length=10000)
    return balances


@app.get("/api/v1/members/finance/carbon_units_burned")
async def read_carbon_units_burned():
    vcu_burned = await db.ipci.find({}, {"member_id": 1, "vcu_burned": 1, "_id": 0}).to_list(length=10000)
    return vcu_burned
