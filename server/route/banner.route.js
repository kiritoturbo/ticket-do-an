const express = require("express");
const controller = require("../controller/bannerController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
// const cloudinary = require("../helper/cloudinary");

const router = express.Router();

router.post(
  "/post/create",
  isAuthenticated,
  isAdmin,
  // cloudinary.single("image"),
  controller.createPost
);
router.get("/posts/show", controller.showPost);

router.get("/post/:id", controller.showSinglePost);
//:id ở đây là truyền trực tiếp vào cứ không phải là param nữa
router.delete("/delete/post/:id", [
  isAuthenticated,
  isAdmin,
  controller.deletePost,
]);
router.put("/update/post/:id", [
  isAuthenticated,
  isAdmin,
  // cloudinary.single("image"),
  controller.updatePost,
]);

module.exports = router;
