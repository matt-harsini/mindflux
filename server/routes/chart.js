import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getChartData,
  getPieChartData,
} from "../controller/chartsController.js";

const router = express.Router();

router.use(auth);

router.get("/chart-data", getChartData);

router.get("/pie-data", getPieChartData);

export { router };
