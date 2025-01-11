const express = require("express");
const router = express.Router();
const {
    loginUser,
  registerUser,
} = require("../controllers/authController");
const { validateRegisterData, validateLoginData } = require("../utils/validater");

router.post("/login",validateLoginData, loginUser);
router.post("/register",validateRegisterData, registerUser);

module.exports = router;
