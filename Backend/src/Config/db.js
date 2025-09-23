import { Sequelize } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH || "./database.sqlite",
  logging: false, // disable logs, set true if you want SQL logs
});

// Test connection
try {
  await sequelize.authenticate();
  console.log("✅ Database connected (Sequelize + SQLite)");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}

export default sequelize;
