const path = require("path");
const multer = require("multer");

const storageImage = multer.diskStorage({
	destination: "public/images",
	filename: function (req, file, cb) {
		cb(null, Date.now().toString() + path.extname(file.originalname));
	},
});

const uploadImageAssets = multer({
	storage: storageImage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).fields([{ name: "gambar_asset_depan" }, { name: "gambar_asset_belakang" }]);

function checkFileType(file, cb) {
	const allowedFileTypes = /jpeg|jpg|png/;
	const extname = allowedFileTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = allowedFileTypes.test(file.mimetype);
	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb("Please upload only an image file");
	}
}

module.exports = { uploadImageAssets };
