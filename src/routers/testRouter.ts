import { Router } from "express";

import { jtwAuth } from "../middlewares/jwtAuthMiddleware";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { testSchema } from "../schemas/testSchema";

import { createTest, getDisciplineTests, getTeacherTests } from "../controllers/testController";


const testRouter = Router();

testRouter.use(jtwAuth);

testRouter.post("/test", schemasMiddleware(testSchema), createTest);
testRouter.get("/tests/disciplines", getDisciplineTests);
testRouter.get("/tests/teachers", getTeacherTests);

export default testRouter;