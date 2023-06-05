import express from "express";
import { login, register } from "../controller/userController";

const express = express();

const router = express.Router();

router.post("/login", login);

router.post("/signup", register);

module.exports = router;
