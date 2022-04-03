const { register } = require("../controllers/authController");

const authRouter = require("express").Router();

authRouter.route("/register").post(register);

module.exports = authRouter;
