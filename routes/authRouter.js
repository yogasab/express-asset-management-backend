const { register, login, logout } = require("../controllers/authController");
const protectRoute = require("../middlewares/protectRoute");

const authRouter = require("express").Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(protectRoute, logout);

module.exports = authRouter;
