const {prisma} = require("../utils/prismaDBconnect");
const validStatus = ["PLANNED", "ONGOING", "COMPLETED"];

const createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    if (!name || !description || !status)
      return res
        .status(400)
        .json({ error: "Please provide name, description, status" });

    if (!validStatus.includes(status))
      return res.status(400).json({
        error:
          "Invalid status : status can only have {PLANNED, ONGOING, COMPLETED}",
      });

    const user = req.user;

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        status: status || "PLANNED",
        userId: user.userId,
      },
    });

    res.status(201).json({
      message: "Project Created with  name, description, status Successfully ",
      newProject,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create projects", error: error.message });
  }
};

// Get All Projects
const listProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

// Update a Project( Only created BY YOU )
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    if (!name && !description && !status)
      return res
        .status(400)
        .json({
          error:
            "Please provide any of these details to update , name, description or status",
        });

    if (status && !validStatus.includes(status))
      return res.status(400).json({
        error:
          "Invalid status : status can only have {PLANNED, ONGOING, COMPLETED}",
      });

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description, status },
    });

    res.status(200).json({
      message:
        "Updated Succesfully - details can be updated only (name, description or status) ",
      updatedProject,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update projects", error: error.message });
  }
};

// Delete a Project( Only created BY YOU )
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Step 1: Delete tasks related to the project
    await prisma.task.deleteMany({
      where: {
        projectId: projectId,
      },
    });

    // Step 2: Delete the project
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res
      .status(200)
      .json({
        message:
          "Project deleted and all associated tasks deleted successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
};

module.exports = { createProject, updateProject, deleteProject, listProjects };
