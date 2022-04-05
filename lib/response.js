const sendSuccessResponse = (res, statusCode, status, message, data) => {
	return res.status(statusCode).json({
		status,
		message,
		code: statusCode,
		data,
	});
};
const sendErrorResponse = (res, statusCode, status, message) => {
	res.status(statusCode).json({
		status,
		code: statusCode,
		message,
	});
};

module.exports = { sendSuccessResponse, sendErrorResponse };
