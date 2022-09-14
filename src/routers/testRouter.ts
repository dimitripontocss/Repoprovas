import { Router } from "express";

import { jtwAuth } from "../middlewares/jwtAuthMiddleware";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { testSchema } from "../schemas/testSchema";

import { createTest, getDisciplineTests, getTeacherTests } from "../controllers/testController";


const testRouter = Router();

testRouter.use(jtwAuth);

testRouter.post("/test", schemasMiddleware(testSchema), createTest);
testRouter.get("/tests/discipline/:disciplineId", getDisciplineTests);
testRouter.get("/tests/teacher/:teacherId", getTeacherTests);

export default testRouter;