import express from "express";
import {
  getChartData,
  getPieChartData,
} from "../controller/chartsController.js";

const router = express.Router();

router.get("/chart-data", getChartData);

router.get("/pie-data", getPieChartData);

export { router };
