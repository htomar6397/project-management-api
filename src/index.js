require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");



const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/projects", taskRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Project Management API!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
