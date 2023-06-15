import { StatusCodes } from "http-status-codes";
import { Log } from "../models/logModel.js";
import { getDifferenceInDates } from "../utils/index.js";

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
  try {
    const logs = await Log.find({ user_id });
    res.status(StatusCodes.OK).json({ logs });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again" });
  }
}

async function getMonthLogs(req, res) {
  try {
    const { f, l } = req.query;
    const documents = await Log.find({
      createdAt: {
        $gte: f,
        $lt: l,
      },
    }).sort({ createdAt: -1 });
    const payload = new Array(getDifferenceInDates(f, l) + 1)
      .fill()
      .map(() => []);
    documents.forEach((document) => {
      const date = +new Date(document.createdAt).getDate();
      payload[date - 1].push(document);
    });
    res.status(StatusCodes.OK).json({ payload });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again" });
  }
}

async function deleteLog(req, res) {
  try {
    await Log.deleteOne({ _id: req.params.id });
    console.log(task);
    res.status(StatusCodes.NO_CONTENT).json({ task });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again" });
  }
}

export { createLog, getAllLogs, getMonthLogs, deleteLog };
