const {prisma} = require("../utils/prismaDBconnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token in a custom header
    res.set("Authorization", `Bearer ${token}`);

    // Respond with the token as well (optional, for client-side use)
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "unable to Login", error: error.message });
  }
};

// Register a New User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "unable to Register", error: error.message });
  }
};

module.exports = { loginUser, registerUser };
