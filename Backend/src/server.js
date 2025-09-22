import dotenv from "dotenv";
import express from "express";
import { initDB } from "./Config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lost-found", lostFoundRoutes);
app.use("/photos", photoRoutes);
app.use("/places", placeRoutes);

// DB init
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB init failed:", err);
  });
