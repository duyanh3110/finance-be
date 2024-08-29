const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.services");

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
}

module.exports = AccessController;
