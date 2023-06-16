import "dotenv/config";
import jwt from "jsonwebtoken";
import StatusCode from "http-status-codes";
import { User } from "../models/userModel.js";

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

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(StatusCode.OK).json({ username, token, email: user.email });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ error: error.message });
  }
}

async function register(req, res) {
  const { email, username, password } = req.body;
  try {
    const user = await User.register(email, username, password);
    const token = createToken(user._id);
    res.status(StatusCode.OK).json({ username, token });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: displayErrorMessage(error.message) });
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
    return res.json({ authorized: false });
  }
}

export { login, register, verify };
