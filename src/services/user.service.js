"use strict";

const _ = require("lodash");
const { NotFoundError } = require("../core/error.response");
const db = require("../models");
const { getInfoData } = require("../utils");
const moment = require("moment");

class UserService {
	static findUserByEmail = async (email) => {
		return await db.users.findOne({
			where: {
				email: email,
			},
		});
	};

	static getUserData = async (id) => {
		const foundUser = await db.users.findOne({
			where: {
				id,
			},
		});
		if (!foundUser) {
			throw new NotFoundError("User not found!");
		}

		return {
			user: getInfoData({
				fields: [
					"id",
					"email",
					"first_name",
					"last_name",
					"date_birth",
					"phone_number",
				],
				object: foundUser,
			}),
		};
	};

	static updateUserData = async (
		{ email, first_name, last_name, date_birth, phone_number },
		id
	) => {
		try {
			const foundUser = await db.users.findOne({ id });
			if (!foundUser) {
				throw new NotFoundError("User not found!");
			}

			const updatedUser = await db.users.update(
				{
					email,
					first_name,
					last_name,
					date_birth: moment(date_birth, "YYYY-MM-DD"),
					phone_number,
				},
				{
					where: {
						id,
					},
					returning: true,
					plain: true,
				}
			);

			return {
				user: getInfoData({
					fields: [
						"id",
						"email",
						"first_name",
						"last_name",
						"date_birth",
						"phone_number",
					],
					object: updatedUser[1],
				}),
			};
		} catch (error) {
			return error;
		}
	};
}

module.exports = UserService;
