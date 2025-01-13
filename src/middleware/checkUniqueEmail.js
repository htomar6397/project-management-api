const {prisma} = require("../utils/prismaDBconnect");


const checkUniqueEmail = async (req, res, next) => {
    const { email } = req.body;
   try{ const user = await prisma.user.findFirst({
        where: { email },
    });
    
    if (user) {
        return res.status(400).json({ error: "Email already exists" });
    }
    
    next();
}

catch(error){
    console.error(error);
    res.status(500).json({ message: "Error during unique email check", error: error.message });
 }
}

module.exports = checkUniqueEmail;