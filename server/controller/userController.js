import { User } from "../models/userModel.js";

function login(req, res) {
  console.log(123);
  res.json({ msg: "Login User" });
}

function register(req, res) {
  res.json({ msg: "Register User" });
}

export { login, register };
