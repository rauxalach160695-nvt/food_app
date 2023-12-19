const express = require("express");
const router = express.Router();
const SeaarchController = require("../controller/searchController.js");



router.post("/searchByName", SeaarchController.searchByName);
router.post("/searchByPrice", SeaarchController.searchByPrice);
router.post("/searchByType", SeaarchController.searchByType);

module.exports = router;