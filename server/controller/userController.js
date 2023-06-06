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
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
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

export { login, register };
