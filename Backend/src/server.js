require("dotenv").config();
const express = require("express");
const db = require("./config/db"); // ✅ centralized DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Manora Tourism Platform Backend is Running 🚀");
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/lostfound", require("./routes/lostFoundRoutes"));
app.use("/photocontest", require("./routes/photoContestRoutes"));
app.use("/places", require("./routes/placeRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
