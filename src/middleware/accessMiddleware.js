const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware to check if the user is authorized to update/delete a project
const authorizeProjectAccess = async (req, res, next) => {
  try {
    const { userId } = req.user; // Extracted from JWT token
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the user is associated with the project
    if (project.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to access this project" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware to check if the user is authorized to update/delete a task
const authorizeTaskAccess = async (req, res, next) => {
  try {
    const { userId } = req.user; // Extracted from JWT token
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the user is assigned to the task or associated with the task's project
    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
    });

    if (task.assignedUserId !== userId && project.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to access this task" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { authorizeProjectAccess, authorizeTaskAccess };
