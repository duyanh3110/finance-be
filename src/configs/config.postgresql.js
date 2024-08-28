"use strict";

const dev = {
	app: {
		port: process.env.DEV_APP_PORT || 3055,
	},
	db: {
		host: process.env.DEV_DB_HOST || "localhost",
		port: process.env.DEV_DB_PORT || 5432,
		name: process.env.DEV_DB_NAME || "finance",
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		url: process.env.DB_URL,
	},
};

const prod = {
	app: {
		port: process.env.PROD_APP_PORT || 3055,
	},
	db: {
		host: process.env.PROD_DB_HOST || "localhost",
		port: process.env.PROD_DB_PORT || 5432,
		name: process.env.PROD_DB_NAME || "finance",
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		url: process.env.DB_URL,
	},
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
