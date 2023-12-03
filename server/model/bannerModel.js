const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    postedBy: {
      type: ObjectId,
      ref: "Users",
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
