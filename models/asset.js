"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Asset extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Asset.belongsTo(models.CategoryAsset, {
				foreignKey: "category_asset_id",
				as: "category",
			});
			Asset.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
		}
	}
	Asset.init(
		{
			user_id: DataTypes.INTEGER,
			nama: DataTypes.STRING,
			jenis_asset: DataTypes.INTEGER,
			tanggal_terima: DataTypes.DATE,
			masa_asset: DataTypes.INTEGER,
			harga_perolehan: DataTypes.INTEGER,
			gambar_asset_belakang: DataTypes.STRING,
			gambar_asset_depan: DataTypes.STRING,
			category_asset_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Asset",
		}
	);
	return Asset;
};
