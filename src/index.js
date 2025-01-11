require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");


const app = express();

app.use(cors());
app.use(bodyParser.json());
// user routes
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Project Management API!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
