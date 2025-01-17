const express = require("express");
const { updateTask, deleteTask, listTasksByAssignedUserAndStatus } = require("../controllers/taskController");
const { authorizeTaskAccess } = require("../middleware/accessMiddleware");
const addPagination = require("../middleware/addPagination");

const router = express.Router();


// List Tasks filtered by AssignedUser And Status
router.get("/",addPagination, listTasksByAssignedUserAndStatus);

// Update a Task
router.put("/:id", authorizeTaskAccess, updateTask);

// Delete a Task
router.delete("/:id", authorizeTaskAccess, deleteTask);

module.exports = router;
