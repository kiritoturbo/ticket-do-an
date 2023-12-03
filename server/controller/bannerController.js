const Banner = require("../model/bannerModel");
// const cloudinary = require("cloudinary").v2;
const cloudinary = require("../helper/cloudinary");
// const main = require("../app");

//create post
exports.createPost = async (req, res, next) => {
  const { title, content, image } = req.body;
  const fileData = req.file;
  console.log(fileData);
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "image-banner",
      //   width: 1200,
      crop: "scale",
    });
    // console.log(result);
    const post = await Banner.create({
      title,
      content,
      postedBy: req.user._id,
      image: {
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
    const posts = await Banner.find()
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

//show single post
exports.showSinglePost = async (req, res, next) => {
  try {
    const post = await Banner.findById(req.params.id).populate(
      "comments.postedBy",
      "name"
    );
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

//delete post
exports.deletePost = async (req, res, next) => {
  const currentPost = await Banner.findById(req.params.id);

  //delete post image in cloudinary
  const ImgId = currentPost.image.public_id;
  if (ImgId) {
    await cloudinary.uploader.destroy(ImgId);
  }

  try {
    const post = await Banner.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "post deleted",
    });
  } catch (error) {
    next(error);
  }
};

//update post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const currentPost = await Banner.findById(req.params.id);

    // Build the object data with default values if not provided
    const data = {
      title: title || currentPost.title,
      content: content || currentPost.content,
      image: image || currentPost.image,
    };

    if (req.body.image !== "") {
      const ImgId = currentPost.image.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "posts",
        width: 1200,
        crop: "scale",
      });

      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }
    // Update the post in the database
    const postUpdate = await Banner.findByIdAndUpdate(req.params.id, data, {
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
