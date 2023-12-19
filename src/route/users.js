const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController.js");
const auth = require("../middleware/auth.js");

router.get("/", UserController.index);
router.post("/signUp", UserController.signUp);
router.post("/signIn", UserController.signIn);
router.post("/getUserName",auth, UserController.getUserName);
router.put("/editPass",auth, UserController.editPass);
router.put("/editUserName",auth, UserController.editUserName);

module.exports = router;
