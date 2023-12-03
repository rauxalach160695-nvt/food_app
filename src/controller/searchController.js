const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ReturnDocument } = require("mongodb");
require("dotenv").config();
const Food = require("../model/Food");
const FoodState = require("../model/FoodState");

// const db = client.db("aggregation");

exports.searchByName = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { keyword } = req.body;

    var findFood = await Food.find({ foodName: { $regex: keyword } });

    return res.status(200).json({ meesage: findFood });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ meesage: error });
  }
});

exports.searchByPrice = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { keyword } = req.body;

    var findFood = await Food.find({ price: { $lte: keyword } });

    return res.status(200).json({ meesage: findFood });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ meesage: error });
  }
});
