const express = require("express");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../utils/auth");
const router = express.Router();

// Sign up
router.post("/signup", asyncHandler(accessController.signUp));
router.post("/login", asyncHandler(accessController.login));

router.use(authentication);
router.post("/logout", asyncHandler(accessController.logout));

module.exports = router;
