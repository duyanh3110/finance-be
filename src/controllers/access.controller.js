const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
	static signUp = async (req, res, next) => {
		new CREATED({
			message: "signUp successfully!",
			metadata: await AccessService.signUp(req.body),
			options: {
				limit: 10,
			},
		}).send(res);
	};

	static login = async (req, res, next) => {
		new CREATED({
			message: "login successfully!",
			metadata: await AccessService.login(req.body),
		}).send(res);
	};

	static logout = async (req, res, next) => {
		new SuccessResponse({
			message: "logout successfully!",
			metadata: await AccessService.logout(req.keyStore),
		}).send(res);
	};
}

module.exports = AccessController;
