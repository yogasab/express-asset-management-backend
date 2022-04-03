const CategoryAsset = require("../models").CategoryAsset;
const Asset = require("../models").Asset;
module.exports = {
	storeCategoryAssetRoute: async (req, res) => {
		try {
			const { body } = req;
			const category = await CategoryAsset.create(body);
			res.status(201).json({
				status: "success",
				message: "Category added successfully",
				code: 201,
				meta: {
					category,
				},
			});
		} catch (error) {
			res.status(500).json({ status: error.message });
		}
	},
	getAllCategoryAssetRoute: async (req, res) => {
		try {
			const categories = await CategoryAsset.findAll({
				attributes: ["id", "nama_kategori", "deskripsi", "createdAt"],
			});
			res.status(201).json({
				status: "success",
				message: "Category Asset fetched successfully",
				code: 201,
				meta: {
					categories,
				},
			});
		} catch (error) {
			res.status(500).json({ status: error.message });
		}
	},
};
