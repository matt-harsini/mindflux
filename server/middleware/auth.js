import "dotenv/config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";
import { createAPIError } from "../errors/errorHandler.js";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";
import { createToken } from "../utils/index.js";

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
  console.log(user);
  const resetToken = user.createPasswordResetToken();
  await user.save();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/forgot-password/${resetToken}`;

  const message = `Forgot password? Submit a PATCH request with your new password and password confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token is valid for 10 minutes",
      message,
    });
  } catch (error) {
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();
    return next(
      createAPIError(
        "There was an error sending the email. Please try again later!",
        500
      )
    );
  }

  res.status(200).json({
    status: "Success",
    message: "Token sent to email",
  });
};

export async function resetPassword(req, res) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest(hex);

  const user = await User.findOne({
    password_reset_token: hashedToken,
    password_reset_expires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(createAPIError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.password_confirm = req.body.passwordConfirm;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;
  await user.save();

  const token = createToken(user._id);

  res.status(200).json({
    status: "Success",
    token,
  });
}
