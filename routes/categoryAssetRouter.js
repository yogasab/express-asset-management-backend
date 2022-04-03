const {
	storeCategoryAssetRoute,
	getAllCategoryAssetRoute,
} = require("../controllers/categoryAssetController");

const categoryAssetRouter = require("express").Router();

categoryAssetRouter
	.route("/")
	.post(storeCategoryAssetRoute)
	.get(getAllCategoryAssetRoute);

module.exports = categoryAssetRouter;
