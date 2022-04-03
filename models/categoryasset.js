"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CategoryAsset extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			CategoryAsset.hasMany(models.Asset, {
				foreignKey: "category_asset_id",
				as: "assets",
			});
		}
	}
	CategoryAsset.init(
		{
			nama_kategori: DataTypes.STRING,
			deskripsi: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "CategoryAsset",
		}
	);
	return CategoryAsset;
};
