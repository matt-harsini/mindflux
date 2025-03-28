import express from "express";
import {
  createLog,
  deleteLog,
  getAllLogs,
  getMonthLogs,
} from "../controller/logController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.post("/log-mood", createLog);

router.get("/get-logs", getAllLogs);

router.get("/query", getMonthLogs);

router.delete("/delete-log/:id", deleteLog);

export { router };
