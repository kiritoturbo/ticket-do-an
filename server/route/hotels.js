const express = require("express");
const controller = require("../controller/hotel");

const router = express.Router();

//create
router.post("/", controller.createHotel);

//get
router.get("/find/:id", controller.getHotel);
// get all
router.get("/countByCity", controller.countByCity);
router.get("/countByType", controller.countByType);
router.get("/", controller.getAllHotell);
router.get("/room/:id", controller.getHotelRooms);

//update
router.put("/:id", controller.updateHotel);

// delete
router.delete("/:id", controller.deleteHotel);

module.exports = router;
