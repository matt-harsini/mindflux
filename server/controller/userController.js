import "dotenv/config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";
import { createToken } from "../utils/index.js";
import crypto from "crypto";
import { createAPIError } from "../errors/errorHandler.js";
import { sendEmail } from "../utils/email.js";

function displayErrorMessage(error) {
  switch (true) {
    case error.includes("username:"):
      return "Username must contain only letters or numbers.";
    case error.includes("email:"):
      return "Must be a valid email.";
    case error.includes("password:"):
      return "Password must contain at least one symbol, number, uppercase, and lowercase characters.";
    default:
      return error;
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(StatusCodes.OK).json({ username, token, email: user.email });
  } catch (error) {
    next(
      createAPIError(
        displayErrorMessage(error.message),
        StatusCodes.BAD_REQUEST
      )
    );
  }
}

async function register(req, res, next) {
  const { email, username, password } = req.body;
  try {
    const user = await User.register(email, username, password);
    const token = createToken(user._id);
    res.status(StatusCodes.OK).json({ username, token });
  } catch (error) {
    next(
      createAPIError(
        displayErrorMessage(error.message),
        StatusCodes.BAD_REQUEST
      )
    );
  }
}

async function verify(req, res) {
  if (!req.headers.authorization) return;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const { _id } = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
    const user = await User.findOne({ _id });
    if (!user) throw new Error("User does not exist");
    return res.json({
      authorized: true,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.json({
      authorized: false,
      message: error.message,
    });
  }
}

async function forgotPassword(req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(createAPIError("Cannot find user", 404));
  }
  const resetToken = user.createPasswordResetToken();

  await user.save();

  const resetURL = `${req.get("origin")}/${resetToken}`;

  const message = `Forgot your password? Click on the link below to reset and confirm your password.\n${resetURL}\nIf you didn't forget your password, please ignore this email`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Mindflux - Reset Password",
      message,
    });
  } catch (error) {
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();
    return next(
      createAPIError(
        "There was an error sending the email. Please try again later!",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }

  return res.status(200).json({
    status: "Success",
    message: "Token sent to email",
  });
}

async function verifyPasswordToken(req, res, next) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    password_reset_token: hashedToken,
    password_reset_expires: { $gt: Date.now() },
  });

  if (!user) {
    return next(createAPIError("Token is not valid", StatusCodes.UNAUTHORIZED));
  }

  return res.status(StatusCodes.OK).json({ status: "Success" });
}

async function resetPassword(req, res, next) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    password_reset_token: hashedToken,
    password_reset_expires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      createAPIError("Token is invalid or has expired", StatusCodes.BAD_REQUEST)
    );
  }

  user.password = req.body.password;
  user.password_confirm = req.body.passwordConfirm;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;

  try {
    await user.save();
  } catch (error) {
    return next(createAPIError(error.message, StatusCodes.BAD_REQUEST));
  }

  const token = createToken(user._id);

  return res.status(200).json({
    status: "Success",
    token,
  });
}

async function updateUser(req, res, next) {
  console.log(req.user);
  console.log(123);
  res.sendStatus(200);
}

export {
  login,
  register,
  verify,
  forgotPassword,
  resetPassword,
  verifyPasswordToken,
  updateUser,
};
