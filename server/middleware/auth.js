import "dotenv/config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authoirzation token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Request is not authorized" });
  }
};
