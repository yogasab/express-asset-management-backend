"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Asset, {
				foreignKey: "user_id",
				as: "assets",
			});
		}
	}

	User.init(
		{
			nama: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.STRING, allowNull: false },
			avatar: { type: DataTypes.STRING, allowNull: false },
			role: { type: DataTypes.STRING },
			nomor_telp: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeCreate(async (user, options) => {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	});

	User.prototype.isPasswordMacthed = async function (enteredPassword) {
		return await bcrypt.compare(enteredPassword, this.password);
	};

	return User;
};
