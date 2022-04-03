const {
	storeAssetRoute,
	getAssetByUserIDRoute,
	getCategoryAssetByUserIDRoute,
	getAssetByIDRoute,
	getAssetByQuerySearchRoute,
	getAssetDetailsRoute,
	deleteAssetRoute,
} = require("../controllers/assetController");

const assetRouter = require("express").Router();

assetRouter.route("/").post(storeAssetRoute);
assetRouter.route("/user/:user_id").get(getAssetByUserIDRoute);
assetRouter
	.route("/:id/user/:user_id/category_asset/:category_asset_id")
	.get(getAssetDetailsRoute)
	.delete(deleteAssetRoute);
assetRouter
	.route("/user/:user_id/category_asset/:category_asset_id")
	.get(getCategoryAssetByUserIDRoute);
assetRouter
	.route("/user/:user_id/category_asset/:category_asset_id/search")
	.get(getAssetByQuerySearchRoute);

module.exports = assetRouter;
