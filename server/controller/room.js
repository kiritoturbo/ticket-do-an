// import Room from '../models/Room.js'
// import Hotel from '../models/Hotel.js'
// import {createError} from '../utils/error.js'
const Room = require("../model/Room");
const Hotel = require("../model/Hotel");

module.exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
module.exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
module.exports.updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
module.exports.deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};
module.exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
module.exports.getAllRooml = async (req, res, next) => {
  try {
    const rooms = await Room.find(req.params.id);
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
