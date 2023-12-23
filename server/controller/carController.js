const Car = require("../model/carModel");
const cloudinary = require("cloudinary").v2;
const main = require("../index");

//create post
exports.createPost = async (req, res, next) => {
  const { brand, model, type, img, postedBy, fuel, seats, charges } = req.body;
  try {
    // upload image in cloudinary
    const result = await cloudinary.uploader.upload(img, {
      folder: "car",
      width: 1200,
      crop: "scale",
    });
    const post = await Car.create({
      ...req.body,
      brand,
      type,
      postedBy: req.user._id,
      img: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//show posts
exports.showPost = async (req, res, next) => {
  try {
    const posts = await Car.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "fullName");
    res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

//delete post
exports.deletePost = async (req, res, next) => {
  const currentPost = await Car.findById(req.params.id);
  //delete post image in cloudinary
  const ImgId = currentPost.img.public_id;
  if (ImgId) {
    await cloudinary.uploader.destroy(ImgId);
  }

  try {
    const post = await Car.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Car deleted",
    });
  } catch (error) {
    next(error);
  }
};
//show single post
exports.showSinglePost = async (req, res, next) => {
  try {
    const post = await Car.findById(req.params.id).populate("name");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
//update post
exports.updatePost = async (req, res, next) => {
  try {
    // const { title, content, img } = req.body;
    const { brand, model, type, img, fuel, seats, charges } = req.body;
    const currentPost = await Car.findById(req.params.id);
    // Build the object data with default values if not provided
    const data = {
      brand: brand || currentPost.brand,
      model: model || currentPost.model,
      type: type || currentPost.type,
      fuel: fuel || currentPost.fuel,
      seats: seats || currentPost.seats,
      charges: charges || currentPost.charges,
      img: img || currentPost.img,
    };

    if (req.body.img !== "") {
      const ImgId = currentPost.img.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(img, {
        folder: "car",
        width: 1200,
        crop: "scale",
      });

      data.img = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    // Update the post in the database
    const postUpdate = await Car.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    // Respond with the updated post
    res.status(200).json({
      success: true,
      postUpdate,
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
