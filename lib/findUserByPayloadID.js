const User = require("../models").User;

const findUserByPayloadID = async (id) => {
	try {
		const user = await User.findByPk(id, {
			attributes: ["nama", "email", "nomor_telp", "role"],
		});
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = findUserByPayloadID;
