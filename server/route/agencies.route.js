const express = require("express");
const verifyAuth = require("../middleware/authorization/auth.validation.middleware");
const controller = require("../controller/agencies.controller");
const config = require("../config/main.config");
const router = express.Router();

router.get("/", [
  //   verifyAuth.validJWTNeeded,
  //   verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.findAgen,
]);

router.post("/", controller.addAgen);

router.delete("/:id", [
  //   verifyAuth.validJWTNeeded,
  //   verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.deleteAgen,
]);
router.put("/:id", [
  //   verifyAuth.validJWTNeeded,
  //   verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.updateAgen,
]);
router.get("/:id", [
  //   verifyAuth.validJWTNeeded,
  //   verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.findbyId,
]);

module.exports = router;
