const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");





// JWT authentication middleware
const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // optional ..... => (handle at Frontend)
    const user = await prisma.user.findFirst({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Token with that query does not link to any User" });
    }
    //  ......
    
    req.user = decoded; // Add user info to the request

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};



module.exports = { authenticateToken };
