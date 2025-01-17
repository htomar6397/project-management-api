const express = require("express");
const router = express.Router();
const { getUser, listUsers, updateUser ,deleteUser } = require("../controllers/userController");
const addPagination = require("../middleware/addPagination");


router.get("/:id", getUser);

router.get("/",addPagination, listUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
