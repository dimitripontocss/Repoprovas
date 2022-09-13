import { Router } from "express";

import authRouter from "./authRouter.js";
import testRouter from "./testRouter.js";

const indexRouter = Router();

indexRouter.use([authRouter,testRouter]);

export default indexRouter;