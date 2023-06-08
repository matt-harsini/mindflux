import { StatusCodes } from "http-status-codes";
import { Log } from "../models/logModel.js";

async function createLog(req, res) {
  const { moodMeter, log, date } = req.body;
  const { _id: user_id } = req.user;
  try {
    await Log.create({ moodMeter, log, date, user_id });
    res.status(StatusCodes.OK).json({ moodMeter, log, date, user_id });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again" });
  }
}

async function getAllLogs(req, res) {
  const { _id: user_id } = req.user;
  const logs = await Log.find({ user_id });
  res.status(StatusCodes.OK).json({ logs });
}

async function deleteLog(req, res) {
  const { id: log_id } = req.params;
  console.log(req.params);
}

export { createLog, getAllLogs };
