const express = require("express");
const {
  createTask,
  
  listTasksByProject,

} = require("../controllers/taskController");

const router = express.Router();


// Create a Task
router.post("/", createTask); 

// List Tasks for a Project
router.get("/", listTasksByProject); 





module.exports = router;


