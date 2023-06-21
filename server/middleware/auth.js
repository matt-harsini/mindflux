import "dotenv/config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";
import { createAPIError } from "../errors/errorHandler.js";

export const auth = async (req, res, next) => {
  const { authorization, Authorization } = req.headers;

  if (!authorization && !Authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authoirzation token required" });
  }

  const token = authorization.split(" ")[1] || Authorization.split(" ")[1];

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

export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(createAPIError("Cannot find user", 404));
  }
  // generate the random reset token
};
