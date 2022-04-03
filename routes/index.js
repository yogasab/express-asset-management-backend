var express = require("express");
var router = express.Router();
const Asset = require("../models").Asset;

/* GET home page. */
router.get("/", async (req, res, next) => {
	try {
		const assets = await Asset.findAll();
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
