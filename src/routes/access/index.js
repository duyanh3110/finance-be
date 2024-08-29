const express = require("express");
const AccessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../utils/auth");
const router = express.Router();

// Sign up
router.post("/signup", asyncHandler(AccessController.signUp));
router.post("/login", asyncHandler(AccessController.login));

router.use(authentication);
router.post("/logout", asyncHandler(AccessController.logout));

module.exports = router;
