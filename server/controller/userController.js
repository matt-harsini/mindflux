import "dotenv/config";
import jwt from "jsonwebtoken";
import StatusCode from "http-status-codes";
import { User } from "../models/userModel.js";

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ error: error.message });
  }
}

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    const token = createToken(user._id);
    res.status(StatusCode.OK).json({ email, token });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ error: error.message });
  }
}

export { login, register };
