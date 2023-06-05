import StatusCode from "http-status-codes";
import { User } from "../models/userModel.js";

function login(req, res) {
  console.log(123);
  res.json({ msg: "Login User" });
}

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    res.status(StatusCode.OK).json({ email, password });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ error: error.message });
  }
}

export { login, register };
