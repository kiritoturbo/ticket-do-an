const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const agenciedSchema = new Schema(
  {
    name: String,
    buyerId: String,
    phoneNumber: String,
    email: String,
    address: String,
    dateOfBirth: Date,
    nationality: String,
    status: Boolean,
    level: Number,
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Agencies", agenciedSchema, "Agencies");

module.exports = {
  create: (booking) => {
    return bookingModel.create(booking);
  },
  findAll: (query) => {
    return bookingModel.find(query); // Change findall to findAll
  },
  findById: (id) => {
    return bookingModel.findById(id);
  },
  update: async (_id, data) => {
    let booking = await bookingModel.findOne({ _id: _id });
    if (!booking) {
      throw new Error("Booking not found");
    }
    Object.assign(booking, data);
    return booking.save();
  },
  delete: async (_id) => {
    let booking = await bookingModel.findById(_id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return bookingModel.findByIdAndDelete(_id);
  },
};
