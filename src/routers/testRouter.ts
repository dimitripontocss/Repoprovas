import { Router } from "express";

import { jtwAuth } from "../middlewares/jwtAuthMiddleware.js";
import { schemasMiddleware } from "../middlewares/schemasMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

import { createTest, getDisciplineTests, getTeacherTests } from "../controllers/testController.js";


const testRouter = Router();

testRouter.use(jtwAuth);

testRouter.post("/test", schemasMiddleware(testSchema), createTest);
testRouter.get("/tests/discipline/:disciplineId", getDisciplineTests);
testRouter.get("/tests/teacher/:teacherId", getTeacherTests);

export default testRouter;