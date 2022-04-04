const Asset = require("../models").Asset;
const User = require("../models").User;
const CategoryAsset = require("../models").CategoryAsset;
const { Op } = require("sequelize");
const fs = require("fs-extra");
const path = require("path");
const Item = require("../../backend-express-staycation/models/Item");

module.exports = {
	storeAssetRoute: async (req, res) => {
		try {
			const { body, files } = req;
			const gambar_asset_depan = files.gambar_asset_depan[0];
			const gambar_asset_belakang = files.gambar_asset_belakang[0];
			const asset = await Asset.create({
				...body,
				gambar_asset_depan: `images/${gambar_asset_depan.filename}`,
				gambar_asset_belakang: `images/${gambar_asset_belakang.filename}`,
			});
			res.status(201).json({
				status: "success",
				message: "Asset created successfully",
				code: 201,
				meta: {
					asset,
				},
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	getAssetByIDRoute: async (req, res) => {
		const { id } = req.params;
		try {
			const assets = await Asset.findAll();
			res.status(200).json({
				status: "success",
				message: "Asset fetched successfully",
				code: 200,
				meta: { assets },
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	// Tampilan Home 2
	getAssetByUserIDRoute: async (req, res) => {
		const { user_id } = req.params;
		try {
			const assets = await Asset.findAll({
				where: { user_id },
				include: {
					model: CategoryAsset,
					as: "category",
					attributes: ["nama_kategori", "deskripsi"],
				},
				attributes: ["category_asset_id"],
			});
			res.status(201).json({
				status: "success",
				message: "Asset created successfully",
				code: 201,
				meta: {
					assets,
				},
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	// Tampilan Home
	getCategoryAssetByUserIDRoute: async (req, res) => {
		const { user_id, category_asset_id } = req.params;
		try {
			const assets = await Asset.findAll({
				where: {
					[Op.and]: [{ user_id }, { category_asset_id }],
				},
				attributes: ["nama", "gambar_asset"],
			});
			res.status(201).json({
				status: "success",
				message: "Asset fetched successfully",
				code: 201,
				meta: {
					assets,
				},
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	getAssetByQuerySearchRoute: async (req, res) => {
		const { user_id, category_asset_id } = req.params;
		const { name } = req.query;
		const loweredCase = name.toLowerCase();
		try {
			const assets = await Asset.findAll({
				where: {
					user_id,
					category_asset_id,
					nama: {
						[Op.like]: `%${loweredCase}%`,
					},
				},
				attributes: ["nama", "gambar_asset"],
			});
			res.status(200).json({
				status: "success",
				message: "Asset fetched successfully",
				code: 200,
				meta: {
					assets,
				},
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	getAssetDetailsRoute: async (req, res) => {
		const { id, user_id, category_asset_id } = req.params;
		try {
			const asset = await Asset.findOne({
				where: {
					id,
					user_id,
					category_asset_id,
				},
				include: [
					{
						model: User,
						as: "user",
						attributes: ["nama"],
					},
					{
						model: CategoryAsset,
						as: "category",
						attributes: ["nama_kategori"],
					},
				],
				attributes: ["tanggal_terima", "masa_asset", "harga_perolehan"],
			});
			res.status(200).json({
				status: "success",
				message: "Asset fetched successfully",
				code: 200,
				meta: {
					asset,
				},
			});
		} catch (error) {
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	editAssetRoute: async (req, res) => {
		const { body, files } = req;
		const { id, user_id, category_asset_id } = req.params;
		const { nama, jenis_asset, tanggal_terima, masa_asset, harga_perolehan } =
			req.body;
		try {
			const asset = await Asset.findOne({
				where: {
					id,
					user_id,
					category_asset_id,
				},
			});
			if (!asset) {
				res.status(404).json({
					status: "failed",
					message: "Asset not found",
					code: 404,
					meta: {},
				});
			}
			if (Object.keys(req.files).length > 0) {
				if (Object.keys(req.files).length === 2) {
					await fs.unlink(path.join(`public/${asset.gambar_asset_belakang}`));
					await fs.unlink(path.join(`public/${asset.gambar_asset_depan}`));
					asset.gambar_asset_belakang = `images/${files.gambar_asset_belakang[0].filename}`;
					asset.gambar_asset_depan = `images/${files.gambar_asset_depan[0].filename}`;
				} else if (files.gambar_asset_belakang) {
					await fs.unlink(path.join(`public/${asset.gambar_asset_belakang}`));
					asset.gambar_asset_belakang = `images/${files.gambar_asset_belakang[0].filename}`;
				} else if (files.gambar_asset_depan) {
					await fs.unlink(path.join(`public/${asset.gambar_asset_depan}`));
					asset.gambar_asset_depan = `images/${files.gambar_asset_depan[0].filename}`;
				}
			}
			asset.jenis_asset = jenis_asset;
			asset.tanggal_terima = tanggal_terima;
			asset.masa_asset = masa_asset;
			asset.harga_perolehan = harga_perolehan;
			await asset.save();
			res.status(200).json({
				status: "success",
				message: "Asset updated successfully",
				code: 200,
				meta: {
					asset,
				},
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				status: "error",
				message: error.message,
				code: 500,
			});
		}
	},
	deleteAssetRoute: async (req, res) => {
		const { id, user_id, category_asset_id } = req.params;
		try {
			const asset = await Asset.findOne({
				where: {
					id,
					user_id,
					category_asset_id,
				},
			});
			if (!asset) {
				res.status(404).json({
					status: "failed",
					message: "Asset not found",
					code: 200,
					meta: {},
				});
			}
			await asset.destroy();
			res.status(200).json({
				status: "success",
				message: "Asset deleted successfully",
				code: 200,
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
