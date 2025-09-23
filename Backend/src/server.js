// src/server.js
import dotenv from "dotenv";
import express from "express";
import { initModels } from "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import missingPersonRoutes from "./routes/missingPersonRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lost-found", lostFoundRoutes);
app.use("/photos", photoRoutes);
app.use("/places", placeRoutes);
app.use("/missing-persons", missingPersonRoutes);

// Init DB and start server
initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
