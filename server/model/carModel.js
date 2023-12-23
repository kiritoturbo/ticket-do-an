const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "brand is required"],
    },
    model: {
      type: String,
      required: [true, "model is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    fuel: {
      type: String,
      required: [true, "fuel is required"],
    },
    seats: {
      type: Number,
      required: [true, "seats is required"],
    },
    charges: {
      type: Number,
      required: [true, "charges is required"],
    },
    postedBy: {
      type: ObjectId,
      ref: "Users",
    },
    img: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
