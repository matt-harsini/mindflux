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

export { createLog };
