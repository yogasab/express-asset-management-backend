const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
	return token;
};

module.exports = generateToken;
