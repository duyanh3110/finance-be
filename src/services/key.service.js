"use strict";

const db = require("../models");

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		publicKey,
		privateKey,
		refreshToken,
	}) => {
		try {
			const foundKey = await db.keys.findOne({
				where: { user_id: userId },
			});

			if (foundKey) {
				const tokens = await db.keys.update(
					{
						public_key: publicKey,
						private_key: privateKey,
						refresh_token: refreshToken,
						refresh_tokens_used: [],
					},
					{
						where: {
							user_id: userId,
						},
					}
				);

				return tokens ? tokens.public_key : null;
			} else {
				const tokens = await db.keys.create({
					id: crypto.randomUUID().toString(),
					user_id: userId,
					public_key: publicKey,
					private_key: privateKey,
					refresh_token: refreshToken,
					refresh_tokens_used: [],
				});
				return tokens ? tokens.public_key : null;
			}
		} catch (error) {
			return error;
		}
	};
}

module.exports = KeyTokenService;
