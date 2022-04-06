const {
	storeAssetRoute,
	getAssetByUserIDRoute,
	getCategoryAssetByUserIDRoute,
	getAssetByQuerySearchRoute,
	getAssetDetailsRoute,
	deleteAssetRoute,
	editAssetRoute,
	reportAssetRoute,
} = require("../controllers/assetController");
const protectRoute = require("../middlewares/protectRoute");
const { uploadImageAssets } = require("../middlewares/uploadImages");

const assetRouter = require("express").Router();

assetRouter.use(protectRoute);
assetRouter.route("/").post(uploadImageAssets, storeAssetRoute);
assetRouter.route("/reports").post(reportAssetRoute);
assetRouter.route("/user/:user_id").get(getAssetByUserIDRoute);
assetRouter
	.route("/:id/user/:user_id/category_asset/:category_asset_id")
	.put(uploadImageAssets, editAssetRoute)
	.get(getAssetDetailsRoute)
	.delete(deleteAssetRoute);
assetRouter
	.route("/user/:user_id/category_asset/:category_asset_id")
	.get(getCategoryAssetByUserIDRoute);
assetRouter
	.route("/user/:user_id/category_asset/:category_asset_id/search")
	.get(getAssetByQuerySearchRoute);

module.exports = assetRouter;
