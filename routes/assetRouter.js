const {
	storeAssetRoute,
	getAssetByUserIDRoute,
	getCategoryAssetByUserIDRoute,
	getAssetByQuerySearchRoute,
	getAssetDetailsRoute,
	deleteAssetRoute,
	editAssetRoute,
	reportAssetRoute,
	getAsetReminder,
} = require("../controllers/assetController");
const schemas = require("../lib/schemas");
const protectRoute = require("../middlewares/protectRoute");
const { uploadImageAssets } = require("../middlewares/uploadImages");
const validateRequest = require("../middlewares/validateRequest");

const assetRouter = require("express").Router();

assetRouter.use(protectRoute);
assetRouter
	.route("/")
	.post(
		uploadImageAssets,
		validateRequest(schemas.asssetPOST),
		storeAssetRoute
	);
assetRouter.route("/reminder").get(getAsetReminder);
assetRouter
	.route("/reports")
	.post(validateRequest(schemas.assertReportsGET), reportAssetRoute);
assetRouter.route("/category_assets").get(getAssetByUserIDRoute);
assetRouter
	.route("/:id/user/:user_id/category_asset/:category_asset_id")
	.put(validateRequest(schemas.asssetPOST), uploadImageAssets, editAssetRoute)
	.get(getAssetDetailsRoute)
	.delete(deleteAssetRoute);
assetRouter
	.route("/user/:user_id/category_asset/:category_asset_id")
	.get(getCategoryAssetByUserIDRoute);
assetRouter
	.route("/user/:user_id/category_asset/:category_asset_id/search")
	.get(getAssetByQuerySearchRoute);

module.exports = assetRouter;
