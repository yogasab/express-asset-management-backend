const {
	register,
	login,
	logout,
	myProfile,
} = require("../controllers/authController");
const schemas = require("../lib/schemas");
const protectRoute = require("../middlewares/protectRoute");
const validateRequest = require("../middlewares/validateRequest");

const authRouter = require("express").Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(validateRequest(schemas.authLoginPOST), login);
authRouter.route("/logout").post(protectRoute, logout);
authRouter.route("/profile").get(protectRoute, myProfile);

module.exports = authRouter;
