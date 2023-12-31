const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ReturnDocument, ObjectId } = require("mongodb");
require("dotenv").config();
const Food = require("../model/Food");
const FoodRate = require("../model/FoodRate");
const mongoose = require('mongoose');

exports.addFoodRate = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { foodId, rate, comment } = req.body;

    var findRate = await FoodRate.findOne({
      foodId: foodId,
      userId: req.user.user_id,
    });
    if (findRate == null) {
      //Create new FoodRate
      var newFoodRate = new FoodRate({
        foodId,
        rate,
        comment,
        userId: req.user.user_id,
      });

      //Add FoodRate to database
      await newFoodRate.save();

      const listRate = await FoodRate.find({ foodId: foodId });
      // run loop for sum rate
      if (listRate != null) {
        var sumRate = 0;
        listRate.forEach((x) => {
          sumRate += x.rate;
        });

        // average rate
        var foodRating = sumRate / listRate.length;
        foodRating = Math.round(foodRating*10)/10;

        // update new rating for food
        const findFood = await Food.findOneAndUpdate(
          { _id: foodId },
          { rate: foodRating }
        );
      }
      return res
        .status(200)
        .json({ meesage: "Them danh gia mon an thanh cong" });
    } else {
      return res
        .status(400)
        .json({ meesage: "Ban da danh gia mon an nay roi" });
    }
  } catch (error) {
    return res.status(500).json({ meesage: error });
  }
});

exports.viewFoodRate = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { foodId } = req.body;
    idnew =  new ObjectId(foodId)
    listRate = await FoodRate.aggregate([
      { $match: { foodId: idnew} },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
          pipeline: [
            { "$project": { "userName": 1, "avatarNum": 1 ,"_id":0}}
          ],
        },
      },
    ]);

    console.log(listRate);
    return res.status(200).json( listRate );
  } catch (error) {
    return res
      .status(500)
      .json({ meesage:error });
  }
});

exports.check = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { foodId } = req.body;
    var num = 2.342323232324;
    console.log(num.toFixed(2).toString());

    var findRate = await FoodRate.findOne({
      foodId: foodId,
      userId: req.user.user_id,
    });
    if (findRate != null) {
      return res.status(200).json({ meesage: 0 });
    }
    return res.status(200).json({ meesage: 1 });
  } catch (error) {
    return res.status(500).json({ meesage: error });
  }
});
