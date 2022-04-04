const { register, login } = require("../controllers/authController");

const authRouter = require("express").Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

module.exports = authRouter;
