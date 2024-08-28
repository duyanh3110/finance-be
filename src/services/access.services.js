"use strict";

const crypto = require("node:crypto");
const bcrypt = require("bcrypt");
const db = require("../models");
const KeyTokenService = require("./key.service");
const { BadRequestError } = require("../core/error.response");
const { createTokenPair } = require("../utils/auth");
const { getInfoData } = require("../utils");

class AccessService {
	static signUp = async ({ first_name, last_name, email, password }) => {
		const foundUser = await db.users.findOne({ email: email });
		if (foundUser) {
			throw new BadRequestError("Error: User already registered!");
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = await db.users.create({
			id: crypto.randomUUID().toString(),
			first_name,
			last_name,
			email,
			password: passwordHash,
		});
		if (newUser) {
			const privateKey = crypto.randomBytes(64).toString("hex");
			const publicKey = crypto.randomBytes(64).toString("hex");

			const keyStore = await KeyTokenService.createKeyToken({
				userId: newUser.id,
				privateKey: privateKey,
				publicKey: publicKey,
			});

			if (!keyStore) {
				throw new BadRequestError("Error: Keystore error!");
			}

			const tokens = await createTokenPair(
				{ userId: newUser.id, email },
				publicKey,
				privateKey
			);

			return {
				code: 201,
				metadata: {
					user: getInfoData({
						fields: ["id", "email", "first_name", "last_name"],
						object: newUser,
					}),
					tokens,
				},
			};
		}
	};
}

module.exports = AccessService;
