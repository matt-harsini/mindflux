import { StatusCodes } from "http-status-codes";
import { Log } from "../models/logModel.js";

async function getChartData(req, res) {
  const { f, l } = req.query;
  const { _id: user_id } = req.user;
  try {
    if (!f && !l) {
      const documents = await Log.aggregate([
        {
          $match: {
            $and: [
              {
                user_id: user_id.toString(),
              },
            ],
          },
        },
        {
          $group: {
            _id: {
              $substr: ["$createdAt", 0, 10],
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
        $match: {
          $and: [
            {
              user_id: user_id.toString(),
            },
            {
              createdAt: {
                $gte: new Date(f),
                $lte: new Date(l),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            $substr: ["$createdAt", 0, 10],
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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
}

export { getChartData };
