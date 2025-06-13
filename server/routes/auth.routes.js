const express = require("express");
const authRouter = express.Router();

const {register,login} = require("../controller/auth.Controller.js");

authRouter.post("/register-user", register);
authRouter.post("/login-user", login);

module.exports = authRouter;