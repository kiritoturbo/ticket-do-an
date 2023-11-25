// import userModel from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
const userModel = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let WT_SECRET = process.env.WT_SECRET;
console.log(WT_SECRET);

module.exports.signUpUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).then(async (user) => {
    if (user == null) {
      let hash = await bcrypt.hash(password, 10);
      let newUser = new userModel({
        email: email,
        password: hash,
      });
      newUser.save();
      let signed = jwt.sign({ email: email }, WT_SECRET);
      res.status(200).json({
        token: signed,
        userName: newUser.email,
        msg: "Registration Success",
      });
    } else {
      res.status(400).json({ err: "A user with this email already exists" });
    }
  });
};

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).then(async (user) => {
    if (user != null) {
      let pass = await bcrypt.compare(password, user.password);
      if (pass) {
        let signed = jwt.sign({ email: email }, WT_SECRET);
        res.status(200).json({
          token: signed,
          msg: "Login Successfull",
        });
      } else {
        res.status(400).json({ err: "Invalid Credintials" });
      }
    } else {
      res.status(404).json({ err: "user doesn't exists try signing up" });
    }
  });
};
