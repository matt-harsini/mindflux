import express from "express";
import { auth } from "../middleware/auth";
import { getChartData } from "../controller/chartsController";

const router = express.Router();

router.use(auth);

router.get("/chart-data", getChartData);

export { router };
