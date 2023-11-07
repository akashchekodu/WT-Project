const express = require("express");
const { login, signUp } = require("../controllers/authController");

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signUp);

module.exports = { userRouter };
