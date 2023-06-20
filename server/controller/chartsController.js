import { StatusCodes } from "http-status-codes";
import { Log } from "../models/logModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

async function getChartData(req, res) {
  const { f, l } = req.query;
  const { _id: user_id } = req.user;
  try {
    if (!f && !l) {
      const documents = await Chart.find({});
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
              date: {
                $gte: f,
                $lte: l,
              },
            },
          ],
        },
      },
    ]);
    console.log(documents);
    return res.status(StatusCodes.OK).json({ documents });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
}

export { getChartData };
