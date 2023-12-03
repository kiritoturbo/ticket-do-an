const express = require("express");
const controller = require("../controller/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const cloudinary = require("../helper/cloudinary");

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
router.put("/comment/post/:id", isAuthenticated, controller.addComment);
router.put("/addlike/post/:id", isAuthenticated, controller.addLike);
router.put("/removelike/post/:id", isAuthenticated, controller.removeLike);
module.exports = router;
