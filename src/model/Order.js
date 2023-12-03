const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const Order = new Schema({
  date: { type: Date,requiredq: true, default: Date.now},
  userId: { type: ObjectId, required: true, ref: 'User' },
  orderState: { type: Number, required: true },
  image: { type: String, required: true},
  cost: { type: Number, required: true}
});

module.exports = mongoose.model("Order", Order);
