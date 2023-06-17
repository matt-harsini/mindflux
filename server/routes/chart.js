import express from "express";
import { auth } from "../middleware/auth.js";
import { getChartData } from "../controller/chartsController.js";

const router = express.Router();

router.use(auth);

router.get("/chart-data", getChartData);

export { router };
