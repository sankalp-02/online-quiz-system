const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
// const quizRoutes = require('./routes/quizRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Quiz API is running...");
});

// DB TEST ROUTE
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Database connected successfully",
      result,
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});