"use strict";

const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const KeyTokenService = require("../services/key.service");
const { AuthFailureError } = require("../core/error.response");

const HEADER = {
	CLIENT_ID: "x-client-id",
	AUTHORIZATION: "authorization",
	REFRESH_TOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		// accessToken
		const accessToken = await JWT.sign(payload, publicKey, {
			expiresIn: "2 days",
		});

		const refreshToken = await JWT.sign(payload, privateKey, {
			expiresIn: "7 days",
		});

		return { accessToken, refreshToken };
	} catch (error) {
		return error;
	}
};

const authentication = asyncHandler(async (req, res, next) => {
	// 1. Check userId missing or invalid
	// 2. Get access token
	// 3. Verify access token
	// 4. Check user in db
	// 5. Check key Store with userId
	// 6. OK: return next()

	// 1.
	const userId = req.headers[HEADER.CLIENT_ID];
	if (!userId) throw new AuthFailureError("Invalid Request");

	// 2.
	const keyStore = await KeyTokenService.findByUserId(userId);
	if (!keyStore) throw new NotFoundError("Not found keyStore");

	// 3.
	if (req.headers[HEADER.REFRESH_TOKEN]) {
		try {
			const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
			const decodeUser = JWT.verify(refreshToken, keyStore.private_key);

			if (userId !== decodeUser.userId)
				throw new AuthFailureError("Invalid Request");

			req.keyStore = keyStore;
			req.user = decodeUser;
			req.refreshToken = refreshToken;

			return next();
		} catch (error) {
			throw error;
		}
	}

	const accessToken = req.headers[HEADER.AUTHORIZATION];
	if (!accessToken) throw new AuthFailureError("Invalid Request");

	try {
		const decodeUser = JWT.verify(accessToken, keyStore.publicKey);

		if (userId !== decodeUser.userId)
			throw new AuthFailureError("Invalid Request");

		req.keyStore = keyStore;
		next();
	} catch (error) {
		throw error;
	}
});

module.exports = { createTokenPair, authentication };
