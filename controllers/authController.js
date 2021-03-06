const User = require("../models").User;
const generateToken = require("../lib/generateToken");
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
			const token = generateToken(user.id);
			const meta = {};
			meta.nama = user.nama;
			meta.email = user.email;
			meta.password = user.password;
			meta.token = token;

			res.status(201).json({
				status: "success",
				message: "User registered successfully",
				code: 201,
				meta,
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
			let user = await User.findOne({
				where: { email },
				attributes: ["email", "password", "id"],
			});
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

			const token = generateToken(user.id);
			// req.session.jwt = {
			// 	token,
			// };

			let meta = {};
			meta.email = user.email;
			meta.password = user.password;
			meta.token = token;

			res.status(200).json({
				status: "success",
				message: "User loggedin successfully",
				code: 200,
				meta,
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
	logout: async (req, res) => {
		try {
			delete req.headers.authorization;
			res.status(200).json({
				status: "success",
				message: "User logged out successfully",
				code: 200,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message,
				code: 400,
			});
		}
	},
	myProfile: async (req, res) => {
		try {
			const { user } = req;
			const myProfile = user;
			res.status(200).json({
				status: "success",
				message: "Asset fetched successfully",
				code: 200,
				meta: { myProfile },
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
};
