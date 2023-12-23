const express = require("express");
const controller = require("../controller/carController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const cloudinary = require("../helper/cloudinary");

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  // cloudinary.single("image"),
  controller.createPost
);
router.get("/show", controller.showPost);
router.get("/post/:id", controller.showSinglePost);
router.delete("/delete/post/:id", [
  isAuthenticated,
  isAdmin,
  controller.deletePost,
]);
router.put("/update/:id", [
  isAuthenticated,
  isAdmin,
  // cloudinary.single("image"),
  controller.updatePost,
]);
module.exports = router;
