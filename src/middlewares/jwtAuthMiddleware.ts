import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function jtwAuth(req: Request, res: Response, next:NextFunction){
    const key = process.env.JWT_KEY;
    const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
    const data = jwt.verify(token, key);
    res.locals.data = data;
    next();
}