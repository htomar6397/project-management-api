const {prisma} = require("./prismaDBconnect");


const checkUserExists = async (id) => {
  
  const User = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      projects: true, // Include related projects if needed
      tasks: true, // Include related tasks if needed
    },
  });


return User;
};

module.exports = checkUserExists;
