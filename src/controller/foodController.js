const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ReturnDocument, ObjectId } = require("mongodb");
require("dotenv").config();
const Food = require("../model/Food");
const FoodState = require("../model/FoodState");
const FoodRate = require("../model/FoodRate");

exports.index = asyncHandler(async (req, res, next) => {
  const { foodId } = req.body;

  //Get user input
  try {
    const selectedFood = await Food.findOne({ _id: foodId });
    console.log(selectedFood.foodName);

    return res.status(200).json({ meesage: selectedFood });
  } catch (error) {
    return res.status(500).json({ meesage: "Them mon an khong thanh cong" });
  }
});

exports.addFood = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const {
      foodName,
      price,
      description,
      image,
      foodType,
      quantity,
      foodDiscount,
    } = req.body;
    console.log("hello");
    //Create new Food object
    console.log(foodName);
    var newFood = new Food({ foodName, price, description, image, foodType });

    //Add Food to database
    await newFood.save();

    //Create new FoodState object
    var newFoodState = new FoodState({
      foodDiscount,
      quantity,
      foodId: newFood._id,
    });
    //Add new User Detail to database
    await newFoodState.save();

    return res.status(200).json({ meesage: "Them mon an thanh cong" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ meesage: error });
  }
});

exports.updateFood = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { foodName, price } = req.body;

    await Food.findOneAndUpdate({ foodName: foodName }, { price });

    return res.status(200).json({ meesage: "Thay doi gia mon an thanh cong" });
  } catch (error) {
    return res.status(500).json({ meesage: error });
  }
});

exports.updateFoodState = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { foodName, quantity, foodDiscount } = req.body;

    // Find Food object follow food name
    const selectedFood = await Food.findOne({ foodName: foodName });

    //Find and update FoodSate object follow foodid
    await FoodState.findOneAndUpdate(
      { foodId: selectedFood._id },
      { quantity, foodDiscount }
    );

    return res
      .status(200)
      .json({ meesage: "Thay doi trang thai mon an thanh cong" });
  } catch (error) {
    return res.status(500).json({ meesage: error });
  }
});

exports.deleteFood = asyncHandler(async (req, res, next) => {
  //Get user input
  try {
    const { foodName } = req.body;

    // Find Food object follow food name
    const selectedFood = await Food.findOne({ foodName: foodName });

    //Find and delete FoodSate object follow foodid
    await FoodState.findOneAndDelete({ foodId: selectedFood._id });

    // Delete ratings of food
    await FoodRate.deleteMany({ foodId: selectedFood._id });

    await Food.findOneAndDelete({ _id: selectedFood._id });
    return res.status(200).json({ meesage: "Xoa mon an thanh cong" });
  } catch (error) {
    return res.status(500).json({ meesage: error });
  }
});

exports.viewFood = asyncHandler(async (req, res, next) => {
  try {
    //Get user input
    const { foodId } = req.body;
    console.log(foodId)
    // Find Food object follow id
    const selectedFood = await Food.findById(foodId);

    return res.status(200).json( selectedFood );
  } catch (error) {
    return res.status(500).json({ error });
  }
});

exports.viewFoodState = asyncHandler(async (req, res, next) => {
  try {
    //Get user input
    const { foodId } = req.body;
    console.log(foodId)
    // Find Food object follow id
    const selectedFoodState = await FoodState.findOne({foodId: foodId});

    return res.status(200).json( selectedFoodState );
  } catch (error) {
    return res.status(500).json({ error });
  }
});