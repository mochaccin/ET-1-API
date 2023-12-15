import express from "express";
import { login, getMe } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares.js";



const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/me", authRequired, getMe);

export default authRouter;