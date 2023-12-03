const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodType = new Schema({
  type: { type: String, required: true, unique: true },
  foodId: { type: ObjectId, required: true, ref: 'Food' },
});

module.exports = mongoose.model("FoodType", FoodType);
