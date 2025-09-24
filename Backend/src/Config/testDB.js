// testDB.js
import sequelize from "./src/Config/db.js";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
