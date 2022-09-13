import { Request, Response } from "express";

import { INewUserData,TUser } from "../interfaces/interfaces.js";
import * as authServices from "../services/authServices.js";

export async function signup(req:Request, res:Response){
    const newUserData: INewUserData = req.body;
    await authServices.signUpService(newUserData);
    res.sendStatus(201);
}


export async function signin(req:Request, res:Response){
    const userData: TUser = req.body;
    const token = await authServices.signInService(userData);
    res.status(201).send({token});
}