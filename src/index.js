require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/authMiddleware");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const task1Routes = require("./routes/task1Routes");
const task2Routes = require("./routes/task2Routes");
const authRoutes = require("./routes/authRoutes");
const { addProject } = require("./middleware/addProject");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware to handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format in request body" });
  }
  next();
});


app.use('/auth', authRoutes);
// middleware to authenticate tokens for all routes below

// routes
app.use("/users",authenticateToken, userRoutes);
app.use("/projects",authenticateToken, projectRoutes);
app.use("/projects/:projectId/tasks", authenticateToken,addProject, task1Routes);
app.use(
  "/tasks",
  authenticateToken,
  task2Routes
);
app.get("/", (req, res) => {
  res.send("Welcome to the Project Management API!");
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    error: "The requested route does not exist.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
