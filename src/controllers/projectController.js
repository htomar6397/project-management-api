const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProject= async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const user = req.user;
    console.log(user, user.userId);
    
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        status: status || "PLANNED",
        userId: user.userId,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Get All Projects
const listProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Update a Project

const updateProject =  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description, status },
    });

    res.status(200).json({message:"Updated Succesfully" ,updatedProject});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete a Project
const deleteProject=   async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).json({ message: "Project Deleted Succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

module.exports = { createProject, updateProject, deleteProject, listProjects };
