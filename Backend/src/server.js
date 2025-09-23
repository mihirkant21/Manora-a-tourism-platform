import dotenv from "dotenv";
import express from "express";
import sequelize from "./Config/db.js"; // ✅ Sequelize instance
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
app.use(express.json()); // parses application/json
app.use(express.urlencoded({ extended: true })); // parses form data

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lost-found", lostFoundRoutes);
app.use("/photos", photoRoutes);
app.use("/places", placeRoutes);
app.use("/missing-persons", missingPersonRoutes);

// DB sync with Sequelize
sequelize.sync({ alter: true }) // ✅ auto-create/update tables
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB sync failed:", err);
  });
