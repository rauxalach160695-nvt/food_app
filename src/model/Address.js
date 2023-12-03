const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Address = new Schema({
    address: { type: String, require: true, unique:true },
    userId: { type: ObjectId, required: true, unique: true, ref: 'User' },
  });

  module.exports = mongoose.model("Address", Address);