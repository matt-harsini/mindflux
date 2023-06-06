import express from "express";
import { login, register } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

export { router };
