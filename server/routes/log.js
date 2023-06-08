import express from "express";
import { createLog } from "../controller/logController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.post("/log-mood", createLog);

export { router };
