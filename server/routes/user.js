import express from "express";
import { auth, verifyEmail } from "../middleware/auth.js";
import {
  login,
  register,
  verify,
  forgotPassword,
  resetPassword,
  verifyPasswordToken,
  updateUser,
  notifyCalendar,
  notifyLog,
} from "../controller/userController.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/verify", verify);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.patch("/forgot-password/:token", resetPassword);

router.post("/verify-token", verifyPasswordToken);

router.use(auth);

router.post("/notify-calendar", notifyCalendar);

router.post("/notify-log", notifyLog);

router.patch("/update-user", updateUser);

export { router };
