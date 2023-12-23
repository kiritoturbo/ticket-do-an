const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../model/users.model");

// check is user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  //   const { token } = req.cookies;
  // const token = req.headers.authorization;
  const token = req.headers["authorization"];
  console.log("token" + token);
  // let token = req.headers.token;
  if (!token) return next(new ErrorResponse("You must Log In...", 401));
  const accessToken = token.split(" ")[1];
  try {
    // Verify token
    const decoded = jwt.verify(accessToken, process.env.WT_SECRET);
    req.user = await User.findById(decoded.data._id);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Token đã hết hạn, trả về mã lỗi 401
      return res.status(401).json({ message: "Token has expired" });
    } else {
      // Xử lý các lỗi khác
      return res.status(500).json({ message: "Internal Server Error" });
    }
    console.log(error);
    return next(new ErrorResponse("You must Log In", 401));
  }
};

//middleware for admin
exports.isAdmin = (req, res, next) => {
  // console.log(req.user.permissionLevel);
  if (req.user.permissionLevel == "1") {
    // return next(new ErrorResponse("Access denied, you must an admin", 401));
    return res.status(400).json({ error: "Bạn chưa phải admin" });
  }
  next();
};
//middleware for nhân viên
exports.isNhanVien = (req, res, next) => {
  console.log(req.user.permissionLevel);
  if (req.user.permissionLevel == "2047") {
    // return next(new ErrorResponse("Access denied, you must an admin", 401));
    return res.status(400).json({ error: "Bạn cần được cấp quyền bởi admin" });
  }
  next();
};
