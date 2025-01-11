const express = require("express");
const {
    
  updateTask,
  deleteTask,
  listTasksByAssignedUserAndStatus,
} = require("../controllers/taskController");
const {
 
  authorizeTaskAccess,
} = require("../middleware/accessMiddleware");

const router = express.Router();


// List Tasks for a AssignedUser And Status
router.get("/", listTasksByAssignedUserAndStatus);

// Update a Task
router.put("/:id", authorizeTaskAccess, updateTask);

// Delete a Task
router.delete("/:id", authorizeTaskAccess, deleteTask);

module.exports = router;
