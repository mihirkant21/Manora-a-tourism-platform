// src/models/userModel.js
import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";  // ✅ Correct relative path


const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default User;
