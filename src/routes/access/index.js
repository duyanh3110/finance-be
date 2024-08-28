const express = require("express");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();

// Sign up
router.post("/signup", asyncHandler(accessController.signUp));

module.exports = router;
