const { CREATED, SuccessResponse } = require("../core/success.response");
const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");

class UserController {
	static getUser = async (req, res, next) => {
		new CREATED({
			message: "getUser successfully!",
			metadata: await UserService.getUserData(req.user.userId),
		}).send(res);
	};

	static updateUser = async (req, res, next) => {
		new CREATED({
			message: "updateUser successfully!",
			metadata: await UserService.updateUserData(
				req.body,
				req.user.userId
			),
		}).send(res);
	};

	static updatePassword = async (req, res, next) => {
		new CREATED({
			message: "updateUser successfully!",
			metadata: await UserService.updatePassword(
				req.body,
				req.keyStore,
				req.user.userId
			),
		}).send(res);
	};
}

module.exports = UserController;
