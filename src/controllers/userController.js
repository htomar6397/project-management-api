const { PrismaClient } = require("@prisma/client");
const checkUserExists = require("../utils/checkUserExists");
const prisma = new PrismaClient();

// get a  user
const getUser = async (req, res, ) => {
     const { id } = req.params;
     try { 
       const user = await checkUserExists(id);
       if (!user) {
      return res
        .status(400)
        .json({ error: "User not exists with this id" });
    }
       res.json(user);

     } catch (error) {
       res.status(400).json({ error: error.message });
     }
};

// update a  user (Self-Updation Only)
const updateUser = async (req, res) => {
  const { id } = req.params;
  
  const userIdFromToken = req.user.userId;

  // Ensure that the user can only update their own account
  if (id !== userIdFromToken) {
    return res
      .status(403)
      .json({ error: "You can only update your own account." });
  }

  const { name } = req.body;
  try {

    // Check if the user exists
    // optional ...... => ( Frontends Handle this)
    const usr = await checkUserExists(id);
      if (!usr) {
      return res
        .status(400)
        .json({ error: "User not exists with this id" });
    }
   

    const user = await prisma.user.update({
      where: { id },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        // projects: true, // Include related projects if needed
        // tasks: true, // Include related tasks if needed
      },
    });
    res.json({message: "only name can be update" ,user});


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a User (Self-Deletion Only)
const deleteUser = async (req, res) => {
  const userIdFromParams = req.params.id; 
  const userIdFromToken = req.user.userId; 

  // Ensure that the user can only delete their own account
  if (userIdFromParams !== userIdFromToken) {
    return res.status(403).json({ error: "You can only delete your own account." });
  }

  try {
    // Step 1: Check if the user exists
    const user = await checkUserExists(userIdFromParams);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Step 2: Reassign user's tasks to the project owner
       for (const task of user.tasks) {
        const project = await prisma.project.findUnique({
        where: { id: task.projectId },
        select: { userId: true }, // Fetch the project owner ID
        });
        
        await prisma.task.update({
          where: { id: task.id },
          data: { assignedUserId: project.userId },
        });
      
    }

    // Step 3: Delete the user's projects and related tasks
    for (const project of user.projects) {
      await prisma.task.deleteMany({
        where: { projectId: project.id },
      });

      await prisma.project.delete({
        where: { id: project.id },
      });
    }

    // Step 4: Delete the user
    await prisma.user.delete({
      where: { id: userIdFromParams },
    });

    // Success response
    res.status(200).json({
      message:
        "Your account and associated projects(with their tasks) have been successfully deleted and your assigned task transfer to their project owner.",
    });
  } catch (error) {
    // console.error("Error deleting user:", error);
    res.status(500).json({
      error: "Failed to delete your account. Please try again later.",
      details: error.message,
    });
  }
};


// list all users
const listUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      // projects: true, // Include related projects if needed
      // tasks: true, // Include related tasks if needed
    },
  });
  res.json(users);
};

module.exports = { getUser, updateUser, deleteUser, listUsers };