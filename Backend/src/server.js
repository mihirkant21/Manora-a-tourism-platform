require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5000;

// DB setup
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Manora Tourism Platform Backend is Running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
