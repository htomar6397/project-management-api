const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const addProject=async (req,res,next)=>{
    const {projectId}=req.params;
     try {

    const Project = await prisma.project.findFirst({
      where: { id:projectId }
    });
  if (!Project) {
    return res.status(404).json({ error: "Project not found" });
  }
   req.projectId = projectId;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to proceeds in checking project for tasks" });
  }
    
    next();
}
module.exports={addProject};