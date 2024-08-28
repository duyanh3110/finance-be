"use strict";

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	const Key = sequelize.define(
		"key",
		{
			id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			private_key: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			public_key: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			refresh_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			refresh_tokens_used: {
				type: Sequelize.ARRAY(DataTypes.STRING),
				allowNull: false,
				defaultValue: [],
			},
		},
		{ timestamps: true }
	);
	return Key;
};
