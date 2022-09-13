import { Router } from "express";

import authRouter from "./authRouter.js";

const indexRouter = Router();

indexRouter.use([authRouter]);

export default indexRouter;