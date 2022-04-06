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
				validate: {
					notNull: { message: "User wajib diisi" },
				},
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notNull: { message: "Nama wajib diisi" },
				},
			},
			jenis_asset: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notNull: { message: "Jenis asset wajib diisi" },
				},
			},
			tanggal_terima: {
				type: Sequelize.DATEONLY,
				allowNull: false,
				validate: {
					notNull: { message: "Tanggal terima wajib diisi" },
				},
			},
			masa_asset: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notNull: { message: "Masa aset wajib diisi" },
				},
			},
			harga_perolehan: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notNull: { message: "Harga perolehan wajib diisi" },
				},
			},
			gambar_asset_depan: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gambar_asset_belakang: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			category_asset_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notNull: { message: "Category wajib diisi" },
				},
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
