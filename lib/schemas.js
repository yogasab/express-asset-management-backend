const Joi = require("joi");

const schemas = {
	asssetPOST: Joi.object().keys({
		user_id: Joi.number().disallow(null).disallow("").required(),
		nama: Joi.string().disallow(null).disallow("").required(),
		jenis_asset: Joi.date().disallow(null).disallow("").required(),
		masa_asset: Joi.number().disallow(null).disallow("").required(),
		harga_perolehan: Joi.number().disallow(null).disallow("").required(),
		category_asset_id: Joi.number().disallow(null).disallow("").required(),
		gambar_asset_depan: Joi.any()
			.disallow(null)
			.disallow("")
			// .required()
			.label("gambar_asset_depan"),
		gambar_asset_belakang: Joi.any()
			.disallow(null)
			.disallow("")
			// .required()
			.label("gambar_asset_belakang"),
	}),
	assertReportsGET: Joi.object().keys({
		tanggal_awal: Joi.date().disallow(null).disallow("").required(),
		tanggal_akhir: Joi.date().disallow(null).disallow("").required(),
	}),
	authLoginPOST: Joi.object().keys({
		email: Joi.string().email().disallow(null).disallow("").required(),
		password: Joi.string().min(8).disallow(null).disallow("").required(),
	}),
};

module.exports = schemas;
