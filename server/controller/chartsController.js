import { StatusCodes } from "http-status-codes";
import { Chart } from "../models/chartModel.js";

async function getChartData(req, res) {
  const { f, l } = req.query;
  console.log(f, l);
  res.sendStatus(StatusCodes.OK);
}

export { getChartData };
