const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const OrderDetail = new Schema({
  orderId: { type: ObjectId, required: true, ref: 'Order' },
  foodId: { type: ObjectId, required: true, ref: 'Food' },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("OrderDetail", OrderDetail);
