// src/config/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH || "./database.sqlite", // configurable via .env
  logging: false, // set true if you want SQL logs
});

export default sequelize;
