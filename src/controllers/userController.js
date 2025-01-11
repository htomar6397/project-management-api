const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();




const getUser = async (req, res, ) => {
     const { id } = req.params;
     try {
       const user = await prisma.user.findFirst({
         where: { id },
       });
       res.json(user);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
   res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

module.exports = { getUser, updateUser, deleteUser, listUsers };