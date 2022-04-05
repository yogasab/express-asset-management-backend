const jwt = require("jsonwebtoken");
const findUserByPayloadID = require("../lib/findUserByPayloadID");
const { sendErrorResponse } = require("../lib/response");

const protectRoute = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		token = req.headers.authorization.split(" ")[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		try {
			const user = await findUserByPayloadID(payload.id);
			req.user = user;
		} catch (error) {
			sendErrorResponse(res, 401, "failed", "Unauthorized");
		}
	} else {
		sendErrorResponse(res, 401, "failed", "Unauthorized");
	}
	next();
};

module.exports = protectRoute;
