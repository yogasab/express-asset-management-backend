const User = require("../models").User;

const findUserByPayloadID = async (id) => {
	try {
		const user = await User.findByPk(id);
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = findUserByPayloadID;
