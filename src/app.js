require("dotenv").config();
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const express = require("express");
const compression = require("compression");
const app = express();
const db = require("./models");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

//synchronizing the database and forcing it to false so we dont lose data
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("DB has been re sync!");
// });

// list routes
app.use("/v1/api/", require("./routes"));

// handle errors
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	return res.status(statusCode).json({
		status: "error",
		code: statusCode,
		stack: error.stack,
		message: error.message || "Internal Server Error",
	});
});

module.exports = app;
