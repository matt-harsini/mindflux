import express from "express";
import { login, register, verify } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/verify", verify);

export { router };
