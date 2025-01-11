const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, assignedUserId } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        projectId,
        assignedUserId,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// List Tasks for a Project
const listTasks =  async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, assignedUserId } = req.query;

    const filters = {
      projectId,
      ...(status && { status }),
      ...(assignedUserId && { assignedUserId }),
    };

    const tasks = await prisma.task.findMany({
      where: filters,
      include: {
        assignedUser: true, // Include user details
        project: true, // Include project details
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Update a Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedUserId } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status, assignedUserId },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};
// Delete a Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports={createTask,updateTask,deleteTask,listTasks};