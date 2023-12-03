const express = require("express");
const router = express.Router();
const FoodRateController = require("../controller/foodRateController.js");
const auth = require("../middleware/auth.js");


router.post("/addFoodRate",auth, FoodRateController.addFoodRate);
router.post("/viewFoodRate", FoodRateController.viewFoodRate);
router.post("/check",auth, FoodRateController.check);

module.exports = router;