const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');


const FoodState = new Schema({
  quantity: { type: Number, required: true },
  foodDiscount: { type: Number, required: true },
  foodId: { type: ObjectId, required: true, ref: 'Food' },
});

module.exports = mongoose.model("FoodState", FoodState);
