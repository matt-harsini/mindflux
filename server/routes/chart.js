import express from "express";
import {
  getChartData,
  getPieChartData,
} from "../controller/chartsController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.get("/chart-data", getChartData);

router.get("/pie-data", getPieChartData);

export { router };
