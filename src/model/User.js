const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const User = new Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, require: true, unique:true },
  });

  module.exports = mongoose.model("User", User);