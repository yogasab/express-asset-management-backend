"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Assets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			jenis_asset: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			tanggal_terima: {
				type: Sequelize.DATE,
			},
			masa_asset: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			harga_perolehan: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			gambar_asset_depan: {
				type: Sequelize.STRING,
			},
			gambar_asset_belakang: {
				type: Sequelize.STRING,
			},
			category_asset_id: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Assets");
	},
};
