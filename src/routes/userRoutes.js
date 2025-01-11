const express = require("express");
const router = express.Router();
const {getUser, listUsers, updateUser ,deleteUser } = require("../controllers/userController");


router.get("/:id", getUser);

router.get("/", listUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
