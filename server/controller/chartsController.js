import { StatusCodes } from "http-status-codes";
import { Chart } from "../models/chartModel.js";

async function getChartData(req, res) {
  const { f, l } = req.query;
  const { _id: user_id } = req.user;
  try {
    if (!f && !l) {
      const documents = await Chart.find({});
      return res.status(StatusCodes.OK).json({ documents });
    }
    const documents = await Chart.find({
      name: {
        $gte: f,
        $lte: l,
      },
      user_id,
    });
    return res.status(StatusCodes.OK).json({ documents });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
}

export { getChartData };
