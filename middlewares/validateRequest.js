const validateRequest = (schema, property) => {
	return (req, res, next) => {
		const { body } = req;
		const options = {
			abortEarly: false,
			allowUnknown: true,
			stripUnknown: true,
		};
		const { error, value } = schema.validate(body, options);
		if (error) {
			const { details } = error;
			const message = details.map((err) => err.message);
			return res.status(400).json({
				status: 400,
				code: "400",
				data: null,
				message,
			});
		} else {
			next();
		}
	};
};

module.exports = validateRequest;
