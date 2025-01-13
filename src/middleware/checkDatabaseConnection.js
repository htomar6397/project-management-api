const { prisma } = require("../utils/prismaDBconnect");

let isDbHealthy = false; // Flag to track DB health status

// Middleware to check database connection before handling requests
const checkDatabaseConnection = async (req, res, next) => {
  try {
   
    await prisma.$queryRaw`SELECT 1`; // Test the database connection
    if (!isDbHealthy) {
      console.log("✅ Database connection is healthy"); // Log success
    }
    isDbHealthy = true; // Mark DB as healthy if query succeeds
    next(); // Proceed to the next middleware/route
  } catch (error) {
    // If the DB is not reachable, set isDbHealthy to false to recheck on the next request
    isDbHealthy = false; // Reset DB health status to false
    console.error("❌ Database connection error:", error.message);
    res.status(503).json({
      error: "Service Unavailable: Unable to connect to the database",
    });
  }
};

module.exports = checkDatabaseConnection;
