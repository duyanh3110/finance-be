"use strict";

const Key = require("./key.model");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				isEmail: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: true }
	);
	return User;
};
