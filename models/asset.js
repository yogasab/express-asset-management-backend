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
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			nama: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			jenis_asset: { type: DataTypes.INTEGER, allowNull: false },
			tanggal_terima: { type: DataTypes.DATEONLY, allowNull: false },
			masa_asset: { type: DataTypes.INTEGER, allowNull: false },
			harga_perolehan: { type: DataTypes.INTEGER, allowNull: false },
			gambar_asset_belakang: { type: DataTypes.STRING, allowNull: false },
			gambar_asset_depan: { type: DataTypes.STRING, allowNull: false },
			category_asset_id: { type: DataTypes.INTEGER, allowNull: false },
		},
		{
			sequelize,
			modelName: "Asset",
		}
	);
	return Asset;
};
