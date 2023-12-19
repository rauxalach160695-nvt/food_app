const express = require("express");
const router = express.Router();
const FoodController = require("../controller/foodController.js");
const SeaarchController = require("../controller/searchController.js");

const auth = require("../middleware/auth.js");


router.post("/", FoodController.index);
router.post("/addFood", FoodController.addFood);
router.put("/updateFood", FoodController.updateFood);
router.put("/updateFoodState", FoodController.updateFoodState);
router.delete("/deleteFood", FoodController.deleteFood);
router.post("/viewFood", FoodController.viewFood);
router.post("/viewFoodState", FoodController.viewFoodState);

module.exports = router;    