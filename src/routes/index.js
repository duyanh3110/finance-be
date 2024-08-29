"user strict";

const express = require("express");
const router = express.Router();

router.use("/", require("./access"));
router.use("/user", require("./user"));

module.exports = router;
