const express = require("express");
const { authorizeProjectAccess } = require("../middleware/accessMiddleware");
const { deleteProject, updateProject, listProjects, createProject } = require("../controllers/projectController");
const { createTask,listTasksByProject } = require("../controllers/taskController");

const router = express.Router();


// Create a Project
router.post("/", createProject);

// Get All Projects
router.get("/", listProjects);

// Update a Project
router.put("/:id",authorizeProjectAccess, updateProject);

// Delete a Project
router.delete("/:id", authorizeProjectAccess, deleteProject);
 
// Create a Task in the Project
router.post("/:id/tasks",authorizeProjectAccess, createTask); 

// List Tasks for a Specific Project
router.get("/:id/tasks", listTasksByProject); 


module.exports = router;
