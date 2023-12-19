const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ReturnDocument } = require("mongodb");
require("dotenv").config();
const Food = require("../model/Food");
const FoodState = require("../model/FoodState");
const Order = require("../model/Order");
const OrderDetail = require("../model/OrderDetail");

exports.viewOrder = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const listOrder = await OrderDetail.find({ orderId: orderId });

    return res.status(200).json({ meesage: listOrder });
  } catch (error) {
    return res.status(500).json({ meesage: "Xem don hang that bai" });
  }
});

exports.addOrder = asyncHandler(async (req, res, next) => {
  try {
    const { listCart, cost, image, orderState } = req.body;

    console.log("run here!");
    // console.log(listCart.cart)   
    console.log(listCart.cart[0])
    console.log(cost)
    console.log(image)

    var newOrder = new Order({
      cost,
      image,
      orderState,
      userId: req.user.user_id,
    });
    await newOrder.save();
    listCart.cart.forEach(async (element) => {
      var newOrderDetail = new OrderDetail({
        orderId: newOrder._id,
        foodId: element.id,
        quantity: element.quantity,
      });
      await newOrderDetail.save();
    });

    return res.status(200).json({ meesage: "Them don hang thanh cong " });
  } catch (error) {
    return res.status(500).json({ meesage: "Them don hang that bai" });
  }
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.body;

    //Delete all order detail of order
    await OrderDetail.deleteMany({ orderId: orderId });

    //Delete order
    await Order.findOneAndDelete({ _id: orderId });

    return res
      .status(200)
      .json({ meesage: "Xoa don hang khoi lich su thanh cong!" });
  } catch (error) {
    return res.status(500).json({ meesage: "Xoa don hang that bai!" });
  }
});

exports.viewdata = asyncHandler(async (req, res, next) => {
  try {
    const { listCart, cost, orderState, image } = req.body;
    console.log("run here!");
    // console.log(listCart.cart)   
    console.log(listCart.cart[0])
    console.log(cost)
    console.log(image)

    //Delete all order detail of order
    // var jsonVar = JSON.parse(listCart);
    // console.log(jsonVar);
    // console.log(typeof jsonVar);

    //   var keys = [];
    //  for(var key in listCart){
    //     keys.push(key);
    //  }
    //  console.log(keys);

    return res
      .status(200)
      .json({ meesage: "Xoa don hang khoi lich su thanh cong!" });
  } catch (error) {
    return res.status(500).json({ meesage: "Xoa don hang that bai!" });
  }
});
