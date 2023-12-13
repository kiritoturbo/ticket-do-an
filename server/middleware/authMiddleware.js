// import jwt from 'jsonwebtoken'
const jwt = require("jsonwebtoken");
let WT_SECRET = process.env.WT_SECRET;

module.exports = function AuthMiddleWare(req, res, next) {
  let token = req.headers.token;
  if (token == null || token === "")
    res
      .status(404)
      .json({ err: "Invalid Credintials please try logging in again" });
  else {
    jwt.verify(token, WT_SECRET, (err, suc) => {
      if (err)
        res
          .status(400)
          .json({ err: "Invalid Credintials please try logging in again" });
      else {
        req.body.token = suc.data; //tạo thêm biến mới là token nhận giá trị và gửi qua next
        next();
      }
    });
  }
};
