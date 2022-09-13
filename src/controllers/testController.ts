import { Request, Response } from "express";

import { TTest } from "../interfaces/interfaces";
import * as testService from "../services/testService.js";

export async function createTest(req:Request, res:Response){
    const newTestData: TTest = req.body;
    await testService.insertNewTest(newTestData);
    res.sendStatus(201);
}