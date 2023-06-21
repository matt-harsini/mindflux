import express from "express";
import { login, register, verify } from "../controller/userController.js";
import { forgotPassword, resetPassword } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/verify", verify);

router.post("/forgot-password", forgotPassword);

router.patch("/forgot-password/:token", resetPassword);

export { router };
