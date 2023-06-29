import { StatusCodes } from "http-status-codes";
import { Log } from "../models/logModel.js";
import { createAPIError } from "../errors/errorHandler.js";

async function getChartData(req, res, next) {
  const { f } = req.query;
  const { _id: user_id } = req.user;
  try {
    if (!f) {
      const documents = await Log.aggregate([
        {
          $match: {
            user_id: user_id.toString(),
          },
        },
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
          $group: {
            _id: {
              $substr: ["$dateISO", 0, 10],
            },
            Happiness: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_HAPPY", 0],
              },
            },
            Sadness: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_SAD", 0],
              },
            },
            Anger: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_ANGRY", 0],
              },
            },
            Anxiety: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_ANXIOUS", 0],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      return res.status(StatusCodes.OK).json({ documents });
    }
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
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            $substr: ["$dateISO", 0, 10],
          },
          Happiness: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_HAPPY", 0],
            },
          },
          Sadness: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_SAD", 0],
            },
          },
          Anger: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_ANGRY", 0],
            },
          },
          Anxiety: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_ANXIOUS", 0],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return res.status(StatusCodes.OK).json({ documents });
  } catch (error) {
    return next(
      createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

async function getPieChartData(req, res, next) {
  const { f } = req.query;
  const { _id: user_id } = req.user;
  try {
    if (!f) {
      const documents = await Log.aggregate([
        {
          $match: {
            user_id: user_id.toString(),
          },
        },
        {
          $group: {
            _id: null,
            Happiness: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_HAPPY", 0],
              },
            },
            Sadness: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_SAD", 0],
              },
            },
            Anger: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_ANGRY", 0],
              },
            },
            Anxiety: {
              $sum: {
                $ifNull: ["$moodMeter.CARD_ANXIOUS", 0],
              },
            },
          },
        },
        {
          $project: {
            data: [
              {
                name: "Happiness",
                value: "$Happiness",
              },
              {
                name: "Sadness",
                value: "$Sadness",
              },
              {
                name: "Anger",
                value: "$Anger",
              },
              {
                name: "Anxiety",
                value: "$Anxiety",
              },
            ],
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      return res.status(StatusCodes.OK).json({ documents });
    }
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
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          Happiness: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_HAPPY", 0],
            },
          },
          Sadness: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_SAD", 0],
            },
          },
          Anger: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_ANGRY", 0],
            },
          },
          Anxiety: {
            $sum: {
              $ifNull: ["$moodMeter.CARD_ANXIOUS", 0],
            },
          },
        },
      },
      {
        $project: {
          data: [
            {
              name: "Happiness",
              value: "$Happiness",
            },
            {
              name: "Sadness",
              value: "$Sadness",
            },
            {
              name: "Anger",
              value: "$Anger",
            },
            {
              name: "Anxiety",
              value: "$Anxiety",
            },
          ],
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return res.status(StatusCodes.OK).json({ documents });
  } catch (error) {
    return next(
      createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export { getChartData, getPieChartData };
