import { Router } from "express";

import authRouter from "./authRouter";
import testRouter from "./testRouter";

const indexRouter = Router();

indexRouter.use([authRouter,testRouter]);

export default indexRouter;