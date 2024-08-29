"use strict";

const db = require("../models");

class UserService {
	static findUserByEmail = async (email) => {
		return await db.users.findOne({ email: email });
	};

	static getUserData = async (id) => {};
}

module.exports = UserService;
