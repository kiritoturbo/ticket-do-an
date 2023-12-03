const userModel = require("../model/users.model");
const validation = require("../helper/verify.helper");
const crypto = require("crypto");

module.exports.profile = async (req, res) => {
  let user = await userModel.findById(req.jwt.data._id);
  user = user.toJSON();
  delete user._id;
  delete user.__v;
  delete user.hashedPassword;
  //console.log(user);
  // if (!user) {
  //   return res.status(404).json({ errors: ['Not found'] });
  // }
  res.status(200).json(user);
};

module.exports.userRegistaion = async (req, res) => {
  if (!validation.emailValidation(req.body.email)) {
    res.status(400).json({ error: "invalid email" });
    return;
  }
  if (await userModel.isEmailExisted(req.body.email)) {
    res.status(400).json({ err: "email is already exist" });
    return;
  }
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.hashedPassword = salt + "$" + hash;
  //req.body.permissionLevel = 1;
  let user = await userModel.createUser(req.body);
  user = user.toJSON();
  delete user.hashedPassword;
  user.msg = "Registration Success";
  res.status(201).json(user);
};

module.exports.getUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (user) {
    user = user.toJSON();
    delete user.__v;
    delete user.hashedPassword;
  }
  //console.log(user);
  // if (!user) {
  //   return res.status(404).json({ errors: ['Not found'] });
  // }
  res.status(200).json(user);
};

module.exports.patchById = async (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.hashedPassword = salt + "$" + hash;
  }
  userModel.patchUser(req.params.id, req.body).then((result) => {
    if (result) {
      result = result.toJSON();
      delete result.hashedPassword;
    }
    res.status(200).json(result);
  });
  // if (updatedUser.hashedPassword != null)
  //   delete updatedUser.hashedPassword;
  //res.status(200).json(updatedUser);
};

module.exports.removeById = async (req, res) => {
  let query = await userModel.delete(req.params.id);
  res.status(200).json(query);
};

module.exports.listUser = async (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  try {
    let users = await userModel.list(limit, page);
    for (let i = 0; i < users.length; i++) {
      delete users[i].hashedPassword;
    }
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
};
module.exports.logout = async (req, res) => {
  // Lấy token từ yêu cầu
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Hủy bỏ token bằng cách không trả về nó từ máy chủ
    // (Bạn cũng có thể thực hiện các bước xác thực khác tùy thuộc vào cách bạn triển khai)

    // Lưu ý: Mặc dù bạn có thể không trả về token, người dùng vẫn có thể giữ token đã nhận được.
    // Để đảm bảo an toàn tốt hơn, bạn có thể thêm các biện pháp khác như đặt thời hạn sống ngắn cho token.

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
    res.status(500).json({ error: "Cần đăng nhập" });
  }
};
