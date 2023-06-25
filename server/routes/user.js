import express from "express";
import {
  login,
  register,
  verify,
  forgotPassword,
  resetPassword,
  verifyPasswordToken,
} from "../controller/userController.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/verify", verify);

router.post("/forgot-password", forgotPassword);

router.patch("/forgot-password/:token", resetPassword);

router.post("/verify-token/:token", verifyPasswordToken);

export { router };
