"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notNull: true,
				},
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notNull: true,
				},
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notNull: true,
				},
			},
			avatar: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.ENUM({
					values: ["user", "admin"],
				}),
				defaultValue: "user",
			},
			nomor_telp: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
