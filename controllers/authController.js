const User = require("../models").User;
module.exports = {
	register: async (req, res) => {
		try {
			const { body } = req;
			const user = await User.create(body);
			res.status(201).json({
				status: "success",
				message: "User registered successfully",
				code: 201,
				meta: {
					user,
				},
			});
		} catch (error) {
			res.status(500).json({ status: error.message });
		}
	},
};
