const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    // process.exit(1); // Stop the server if the database is not connected
  }
};

// Connect to the database on server startup
connectToDatabase();

module.exports = { prisma };
