const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ReturnDocument } = require("mongodb");
require("dotenv").config();
const Food = require("../model/Food");
const FoodState = require("../model/FoodState");
const _ = require("lodash");

// const db = client.db("aggregation");

exports.searchByName = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { keyword } = req.body;

    // var findFood = await Food.find({
    //   foodName: { $regex: keyword.toLowerCase() },
    var findFood = await Food.aggregate([
      { $match: { foodName: { $regex: keyword.toLowerCase() } } },
      {
        $lookup: {
          from: "foodstates",
          localField: "_id",
          foreignField: "foodId",
          as: "state",
        },
      }]
    );

    if (findFood.length <1){
      subKeyword = keyword.split(' ')
      findFood = await Food.aggregate([
        { $match: { foodType: { $elemMatch: { $eq: subKeyword[0].toLowerCase() } } } },
        {
          $lookup: {
            from: "foodstates",
            localField: "_id",
            foreignField: "foodId",
            as: "state",
          },
        }]
      );
    }
    return res.status(200).json({ findFood });
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

    return res.status(200).json({ findFood });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ meesage: error });
  }
});

exports.searchByType = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { keyword } = req.body;
    

    // var findFood = await Food.find({ foodType:{$elemMatch:{$eq: keyword.toLowerCase() }} });
    var findFood = await Food.aggregate([
      { $match: { foodType: { $elemMatch: { $eq: keyword.toLowerCase() } } } },
      {
        $lookup: {
          from: "foodstates",
          localField: "_id",
          foreignField: "foodId",
          as: "state",
        },
      }]
    );
    return res.status(200).json(findFood);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ meesage: error });
  }
});
