const express = require("express");
const router = express.Router();
const SeaarchController = require("../controller/searchController.js");



router.post("/searchByName", SeaarchController.searchByName);
router.post("/searchByPrice", SeaarchController.searchByPrice);

module.exports = router;