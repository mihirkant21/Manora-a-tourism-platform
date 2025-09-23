// src/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Middleware ----------
app.use(cors()); // allow frontend to call backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- API Routes ----------
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lost-found", lostFoundRoutes);
app.use("/photos", photoRoutes);
app.use("/places", placeRoutes);
app.use("/missing-persons", missingPersonRoutes);

// ---------- Serve Frontend ----------
const frontendPath = path.join(__dirname, "..", "..", "Frontend");
console.log("Serving frontend from:", frontendPath);

app.use(express.static(frontendPath));

// Catch-all route for frontend (must be last, regex works in Express v5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------- Init DB and start ----------
initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});

