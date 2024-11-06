const express = require("express");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

module.exports = app;
