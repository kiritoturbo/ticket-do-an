const express = require("express");
const userMiddleware = require("../middleware/user.middleware");

const controller = require("../controller/authentication.controller");
const { userRegistaion } = require("../controller/user.controller");
const VerifyUserMiddleware = require("../middleware/authorization/verify.user.middleware");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

// userMiddleware.addNormalUser,
router.post("/register", userRegistaion);
router.post("/login", [
  VerifyUserMiddleware.isPasswordAndUserMatch,
  //   isAuthenticated,
  isAdmin,
  controller.logIn,
]);
router.post("/refresh-token", controller.refreshToken);

module.exports = router;
