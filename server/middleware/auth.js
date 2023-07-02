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
      next(
        createAPIError(
          "Password has recently changed, please try again",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    next(createAPIError("Request is not authorized", StatusCodes.UNAUTHORIZED));
  }
}

async function verifyEmail(req, res) {
  try {
    const { verificationToken, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist" });
    }

    if (user.verificationToken !== verificationToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Verification failed" });
    }

    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = "";
    delete user.verificationExpires;

    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ email, message: "Email verified" });
  } catch (error) {
    next(
      createAPIError(
        "Something went wrong, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
}

export { auth, verifyEmail };
