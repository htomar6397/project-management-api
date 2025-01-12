const { PrismaClient } = require("@prisma/client");
const checkUserExists = require("../utils/checkUserExists");
const prisma = new PrismaClient();
const validStatus = ["TODO", "IN_PROGRESS", "DONE"  ];
//  create a task under a project
const createTask = async (req, res) => {
  try {
    const  projectId  = req.params.id;

    const { title, description, status, assignedUserId } = req.body;


    if (!title || !description || !status || !assignedUserId) {
      return res
        .status(400)
        .json({ error: "Please provide title, description, status, assignedUserId" });
    }
    if (!validStatus.includes(status)) {
      return res
       .status(400)
       .json({ error: "Invalid status. Please choose from TODO, IN_PROGRESS, DONE" });
    }

   const assignedUser = await checkUserExists(assignedUserId);
    if (!assignedUser) { 
      return res.status(404).json({ error: "Assigned User not found" });
    } 

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status ,
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

// List Tasks for a Specific Project with filtered data 
const listTasksByProject =  async (req, res) => {
  try {
    const  projectId  = req.params.id;
    const { status, assignedUserId } = req.query;
    
    const project = await prisma.project.findFirst({
      where: { id: projectId }
    });
  
    
    if(!project) 
      return res.status(404).json({ error: "Project not found" });
 

    const filters = {
      projectId,
      ...(status && { status }),
      ...(assignedUserId && { assignedUserId }),
    };

    const tasks = await prisma.task.findMany({
      where: filters,
      include: {
        assignedUser: true, // Include user details
        // project: true, // Include project details
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// List Tasks for a Project
const listTasksByAssignedUserAndStatus =  async (req, res) => {
  try {

    const { status, assignedUserId } = req.query;

    const filters = {
      
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

    if (!title && !description && !status && !assignedUserId) { 
      return res
        .status(400)
        .json({ error: "Please provide any of these details to update , title, description, status, assignedUserId" });
    }
    if (status && !validStatus.includes(status)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid status : status can only have {TODO, IN_PROGRESS, DONE}",
        });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status, assignedUserId },
    });

    res.status(200).json({messsage : "Task Updated Succesfully",updatedTask});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Task not Found or Failed to update task" });
  }
};
// Delete a Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

     res.status(200).json({ message: "Task Deleted Succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Task not Found or Failed to delete task" });
  }
};

module.exports={createTask,updateTask,deleteTask,listTasksByAssignedUserAndStatus,listTasksByProject};