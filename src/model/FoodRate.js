const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const FoodRate = new Schema({
  comment: { type: String, required: true, unique: true, max: 200},
  rate: { type: Number, required: true },
  date: { type: Date,required: true, default: Date.now},
  userId: { type: ObjectId, required: true, ref: 'User' },
  foodId: { type: ObjectId, required: true, ref: 'Food' },
});

module.exports = mongoose.model("FoodRate", FoodRate);
