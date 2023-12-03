const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ReturnDocument } = require("mongodb");
require("dotenv").config();

exports.index = asyncHandler(async (req, res, next) => {
  try {
    var newUser = new User({
      userName: "blabla",
      password: "2312312",
      role,
    });
    console.log(newUser);
    //Add User to database
    await newUser.save();
    return res.status(200).json({ meesage: "add user thanh cong" });
  } catch (error) {
    return res.status(400).json({ meesage: "add user k thanh cong" });
  }
});

//Sign Up
exports.signUp = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const {
      userName,
      password,
      phoneNumber,
    } = req.body;

    //Encrypt user password
    encryptedPassword = await bcrypt.hashSync(password, 10);
    console.log(encryptedPassword);
    //Create new User object
    var newUser = new User({
      userName,
      password: encryptedPassword,
      phoneNumber,
    });

    //Add User to database
    await newUser.save();

    return res.status(200).json({ meesage: "Add user thanh cong" });
  } catch (error) {
    return res.status(500).json({ meesage: "Them user that bai ><" });
  }
});

//Sign in
exports.signIn = asyncHandler(async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    // Validate user input
    if (!(phoneNumber && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ phoneNumber });
    console.log(user);
    if (user && (await bcrypt.compareSync(password, user.password))) {
      // Create token
      console.log("dung mat khau");
      const token = jwt.sign(
        { iss: "ThinhNguyen", user_id: user._id, iat: new Date().getTime() },
        process.env.SECRET_TOKEN
      );
      res.setHeader("Authorization", token);
      return res.status(200).json({ token: token});
    }
    return res.status(400).send("Tai khoan hoac mat khau khong dung");
  } catch (error) {
    return res.status(500).json({ meesage: "loi dang nhap" });
  }
});


exports.editPass = asyncHandler(async (req, res, next) => {
  try {
    var selectedUser = await User.findById(req.user.user_id);
    var currentPass = req.body.currentPass;
    var newPass = req.body.newPass;
    if (await bcrypt.compareSync(currentPass, selectedUser.password)) {
      encryptedPassword = await bcrypt.hashSync(newPass, 10);
      await User.findByIdAndUpdate(
        { _id: req.user.user_id },
        { password: encryptedPassword }
      );
      return res.status(200).json({ meesage: "Thay doi mat khau thanh cong" });
    }
    return res.status(200).json({ meesage: "Mat khau hien tai khong dung " });
  } catch (error) {
    return res.status(500).json({ meesage: "Thay doi mat khau that bai" });
  }
});

// Edit UserName
exports.editUserName = asyncHandler(async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user.user_id },
      { userName: req.body.userName }
    );
    return res
      .status(200)
      .json({ message: "Thay doi ten nguoi dung thanh cong " });
  } catch (error) {
    return res.status(500).json({ meesage: "Thay doi ten nguoi dung that bai" });
  }
});


