const User = require("../models").User;
const bcrypt = require("bcryptjs");
module.exports = {
	register: async (req, res) => {
		const { body } = req;
		const { email } = req.body;
		try {
			const registeredUser = await User.findOne({ where: { email } });
			if (registeredUser) {
				res.status(400).json({
					status: "error",
					message: "User with corresponding email is registered",
					code: 400,
					meta: {},
				});
			}
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
	login: async (req, res) => {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({
				status: "error",
				message: "Please fill the email and password",
				code: 400,
				meta: {},
			});
		}
		try {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				res.status(400).json({
					status: "error",
					message: "User not available",
					code: 400,
					meta: {},
				});
			}
			if (!(await user.isPasswordMacthed(password))) {
				res.status(400).json({
					status: "failed",
					message: "Invalid credentials",
					code: 400,
					meta: {},
				});
			}
			res.status(200).json({
				status: "success",
				message: "User loggedin successfully",
				code: 200,
				meta: { user },
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message,
				code: 400,
				meta: {},
			});
		}
	},
};
