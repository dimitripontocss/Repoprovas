import { Router } from "express";

import { signup, signin } from "../controllers/authController.js";
import { schemasMiddleware } from "../middlewares/schemasMiddleware.js";
import { signInSchema,signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemasMiddleware(signUpSchema), signup);
authRouter.post("/signin", schemasMiddleware(signInSchema), signin);

export default authRouter;