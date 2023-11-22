const express = require("express");
const controller = require("../controller/room");
const verifyAuth = require("../middleware/authorization/auth.validation.middleware");
const config = require("../config/main.config");
const router = express.Router();

//create
router.post("/:hotelid", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.createRoom,
]);
//update
router.put("/:id", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.updateRoom,
]);
router.put("/availability/:id", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.updateRoomAvailability,
]);
// delete
router.delete("/:id", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.deleteRoom,
]);
//get
router.get("/:id", controller.getRoom);
// get all
router.get("/", controller.getAllRooml);

module.exports = router;
