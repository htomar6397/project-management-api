const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Create a Project
router.post("/", async (req, res) => {
  try {
    const { name, description, status, userId } = req.body;

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        status: status || "PLANNED",
        userId,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: true, // Include user details
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Update a Project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description, status },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a Project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
