import { StatusCodes } from "http-status-codes";
import { Log } from "../models/logModel.js";
import { getDifferenceInDates } from "../utils/index.js";
import { createAPIError } from "../errors/errorHandler.js";

async function createLog(req, res, next) {
  const { moodMeter, log, date, timezone } = req.body;
  const { _id: user_id } = req.user;
  try {
    await Log.create({
      moodMeter,
      log,
      date,
      user_id,
      user_date: date,
      timezone,
    });
    return res.status(StatusCodes.OK).json({ moodMeter, log, date, user_id });
  } catch (error) {
    next(createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function getAllLogs(req, res, next) {
  const { _id: user_id } = req.user;
  try {
    const logs = await Log.find({ user_id });
    res.status(StatusCodes.OK).json({ logs });
  } catch (error) {
    next(createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function getMonthLogs(req, res, next) {
  try {
    const { f, l } = req.query;
    const { _id: user_id } = req.user;
    const documents = await Log.aggregate([
      {
        $addFields: {
          localDate: {
            $dateToParts: {
              date: "$createdAt",
              timezone: "$timezone",
            },
          },
        },
      },
      {
        $addFields: {
          dateISO: {
            $dateFromParts: {
              year: "$localDate.year",
              month: "$localDate.month",
              day: "$localDate.day",
              hour: "$localDate.hour",
              minute: "$localDate.minute",
              second: "$localDate.second",
              millisecond: "$localDate.millisecond",
            },
          },
        },
      },
      {
        $match: {
          $and: [
            {
              user_id: user_id.toString(),
            },
            {
              dateISO: {
                $gte: new Date(f),
                $lte: new Date(l),
              },
            },
          ],
        },
      },
    ]).sort({ createdAt: -1 });
    const payload = new Array(getDifferenceInDates(f, l) + 1)
      .fill()
      .map(() => []);
    documents.forEach((document) => {
      payload[Number(new Date(document.dateISO).getDate()) - 1].push(document);
    });
    res.status(StatusCodes.OK).json({ payload });
  } catch (error) {
    next(createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function deleteLog(req, res, next) {
  try {
    await Log.findByIdAndDelete(req.params.id);
    const payload = await Log.find({});
    res.json({ payload });
  } catch (error) {
    next(createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export { createLog, getAllLogs, getMonthLogs, deleteLog };
