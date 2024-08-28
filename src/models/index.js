"use strict";

const {
	db: { host, name, user, password },
} = require("../configs/config.postgresql");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(name, user, password, {
	host,
	dialect: "postgres",
});

try {
	sequelize.authenticate();
	console.log("DB Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./user.model")(sequelize, DataTypes);
db.keys = require("./key.model")(sequelize, DataTypes);

db.users.hasOne(db.keys, {
	foreignKey: "user_id",
});
db.keys.belongsTo(db.users);

module.exports = db;
