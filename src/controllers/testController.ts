import { Request, Response } from "express";

import { TTest } from "../interfaces/interfaces";
import * as testService from "../services/testService.js";

export async function createTest(req:Request, res:Response){
    const newTestData: TTest = req.body;
    await testService.insertNewTest(newTestData);
    res.sendStatus(201);
}

export async function getDisciplineTests(req:Request, res:Response){
    const disciplineId: number = +req.params.disciplineId;
    const tests = await testService.getDisciplineTests(disciplineId);
    res.status(200).send(tests);
}

export async function getTeacherTests(req:Request, res:Response){
    const teacherId: number = +req.params.teacherId;
    const tests = await testService.getTeacherTests(teacherId);
    res.status(200).send(tests);
}