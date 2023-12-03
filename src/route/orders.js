const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController.js");
const auth = require("../middleware/auth.js");


router.post("/viewOrder",auth, OrderController.viewOrder);
router.post("/addOrder",auth, OrderController.addOrder);
router.delete("/deleteOrder",auth, OrderController.deleteOrder);

module.exports = router;