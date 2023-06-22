import "dotenv/config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";
import { createAPIError } from "../errors/errorHandler.js";

async function auth(req, res, next) {
  const { authorization, Authorization } = req.headers;

  if (!authorization && !Authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authoirzation token required" });
  }

  const token = authorization.split(" ")[1] || Authorization.split(" ")[1];

  try {
    const { _id, iat } = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
    const user = await User.findById({ _id });
    if (user.changedPasswordAfter(iat)) {
      return next(
        createAPIError(
          "User recently changed their password, please try again!",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    req.user = user.select("_id");
    next();
  } catch (error) {
    next(createAPIError("Request is not authorized", StatusCodes.UNAUTHORIZED));
  }
}

export { auth };
