import { Request, Response } from "express";

import { INewTestData } from "../interfaces/interfaces";
import * as testService from "../services/testService";

export async function createTest(req:Request, res:Response){
    const newTestData: INewTestData = req.body;
    await testService.insertNewTest(newTestData);
    res.sendStatus(201);
}

export async function getDisciplineTests(req:Request, res:Response){
    const tests = await testService.getDisciplineTests();
    res.status(200).send(tests);
}

export async function getTeacherTests(req:Request, res:Response){
    const tests = await testService.getTeacherTests();
    res.status(200).send(tests);
}