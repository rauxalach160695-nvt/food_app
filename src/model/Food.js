const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const Food = new Schema({
  foodName: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  foodType: { type: Array, required: true },
  image:{type: String ,required: true},
  description: { type: String, required: true },
  rate: {type: Number, default: 5},
});

module.exports = mongoose.model("Food", Food);
