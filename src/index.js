const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
// const cors = require("cors");


env.config();
const app = express();

// app.use(cors());
app.use(bodyParser.json());

// Middleware to handle invalid JSON
// opttional ..... => (handle at frontend)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format in request body" });
  }
  next();
});
// ......



app.use('/api/auth', authRoutes);

//authenticate routes
app.use("/api/users",authenticateToken, userRoutes);
app.use("/api/projects",authenticateToken, projectRoutes);
app.use("/api/tasks",authenticateToken, taskRoutes );

app.get("/", (req, res) => {
  res.send("Welcome to the Project Management API!");
});


// Catch-all route for undefined endpoints
// optional ....... => (handle at frontend)
app.use((req, res) => {
  
  res.status(404).json({
    error: "The requested route does not exist.",
  });
});
// .......


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
