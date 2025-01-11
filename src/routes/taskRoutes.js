const express = require("express");

const { authorizeProjectAccess } = require("../middleware/accessMiddleware");
const { deleteTask, updateTask, listTasks, createTask } = require("../controllers/taskController");

const router = express.Router();


// Create a Task
router.post("/:projectId/tasks",createTask);

// List Tasks for a Project
router.get("/:projectId/tasks",listTasks);

// Update a Task
router.put("/:id",authorizeProjectAccess,updateTask);

// Delete a Task
router.delete("/:id",authorizeProjectAccess, deleteTask);

module.exports = router;
