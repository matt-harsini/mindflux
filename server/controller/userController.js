import "dotenv/config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";
import { createToken } from "../utils/index.js";
import crypto from "crypto";
import { createAPIError } from "../errors/errorHandler.js";
import { sendEmail } from "../utils/email.js";
import bcrypt from "bcrypt";

function displayErrorMessage(error) {
  switch (true) {
    case error.includes("username:"):
      return "Username must contain only letters or numbers.";
    case error.includes("email:"):
      return "Must be a valid email.";
    case error.includes("password:"):
      return "Password must contain at least one symbol, number, uppercase, and lowercase characters.";
    case error.includes("password_confirm"):
      return "Passwords are not the same.";
    case error.includes("phone_number"):
      return "Phone number is not valid.";
    default:
      return error;
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    if (!user.isVerified) {
      return next(
        createAPIError(
          "User has not verified their email",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    const token = createToken(user._id);
    return res
      .status(StatusCodes.OK)
      .json({ username, token, email: user.email });
  } catch (error) {
    return next(
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
    const verificationToken = crypto.randomBytes(40).toString("hex");

    const user = await User.register(
      email,
      username,
      password,
      verificationToken
    );

    const resetURL = `${req.get(
      "origin"
    )}/verify-email?token=${verificationToken}&email=${email}`;

    const message = `Please confirm your email by clicking on the following link. Your session will expire in 30 minutes.\n${resetURL}`;

    await sendEmail({
      from: "mindfluxverify@gmail.com",
      email: user.email,
      subject: "Mindflux - Verify Email",
      message,
      key: process.env.SENDGRID_API_KEY,
    });

    return res.status(StatusCodes.OK).json({
      username,
      verificationToken: user.verificationToken,
      status: "Success",
      message: "Please check your email to verify your account",
    });
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
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
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

  const message = `Forgot your password? Click on the link below to reset and confirm your password. If you didn't forget your password, please ignore this email.\n\n${resetURL}\n\n`;
  try {
    await sendEmail({
      from: "mindfluxrecoveryhelpline@gmail.com",
      email: user.email,
      subject: "Mindflux - Reset Password",
      message,
      key: process.env.SENDGRID_API_KEY,
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

  const match = await bcrypt.compare(req.body.password, user.password);

  if (match) {
    return next(
      createAPIError("Passwords must not be the same", StatusCodes.BAD_REQUEST)
    );
  }

  user.password = req.body.password;
  user.password_confirm = req.body.passwordConfirm;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;

  try {
    await user.save();
  } catch (error) {
    return next(
      createAPIError(
        displayErrorMessage(error.message),
        StatusCodes.BAD_REQUEST
      )
    );
  }

  return res.status(200).json({
    status: "Success",
  });
}

async function updateUser(req, res, next) {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...req.body },
      { runValidators: true }
    );
    return res.sendStatus(StatusCodes.OK);
  } catch (error) {
    return next(
      createAPIError(
        displayErrorMessage(error.message),
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
}

async function notifyCalendar(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.notify_calendar) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User has already been notified" });
    }
    user.notify_calendar = true;
    await user.save();
    return res.status(StatusCodes.OK).json({ message: "Success", user });
  } catch (error) {
    return next(
      createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

async function notifyLog(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.notify_log) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User has already been notified" });
    }
    user.notify_log = true;
    await user.save();
    return res.status(StatusCodes.OK).json({ message: "Success", user });
  } catch (error) {
    return next(
      createAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export {
  login,
  register,
  verify,
  forgotPassword,
  resetPassword,
  verifyPasswordToken,
  updateUser,
  notifyCalendar,
  notifyLog,
};
