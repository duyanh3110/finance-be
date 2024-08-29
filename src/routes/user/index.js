const express = require("express");
const UserController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../utils/auth");
const router = express.Router();

router.use(authentication);
router.get("/", asyncHandler(UserController.getUser));
router.post("/", asyncHandler(UserController.updateUser));

module.exports = router;
