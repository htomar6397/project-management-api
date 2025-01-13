const {prisma} = require("../utils/prismaDBconnect");


const checkUniqueEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
        where: { email },
    });
    
    if (user) {
        return res.status(400).json({ error: "Email already exists" });
    }
    
    next();
}

module.exports = checkUniqueEmail;