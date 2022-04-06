var express = require("express");
const protectRoute = require("../middlewares/protectRoute");
var router = express.Router();
const Asset = require("../models").Asset;

/* GET home page. */
router.use(protectRoute);
router.get("/home", async (req, res, next) => {
	try {
		const { user } = req;
		const assets = await Asset.findAll({
			where: {
				user_id: user.id,
			},
		});
		res.status(201).json({
			status: "success",
			message: "User registered successfully",
			code: 201,
			meta: {
				results: assets.length,
			},
		});
	} catch (error) {
		res.status(500).json({ status: error.message });
	}
});

module.exports = router;
