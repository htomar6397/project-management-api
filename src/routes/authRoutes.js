const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");

const router = express.Router();

// optional ...... validation => ( ALso Done at Frontend)
// Validate data before processing requests
const { validateRegisterData, validateLoginData } = require("../utils/validater");
// .......

// Middleware to check if email is unique before registration
const checkUniqueEmail = require("../middleware/checkUniqueEmail");

router.post("/login",validateLoginData, loginUser);
router.post("/register",validateRegisterData,checkUniqueEmail,registerUser);

module.exports = router;
