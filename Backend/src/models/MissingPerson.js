// src/models/userModel.js
import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";  // ✅ Correct relative path

import User from "./userModel.js";

const MissingPerson = sequelize.define("MissingPerson", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER },
  lastSeenLocation: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

User.hasMany(MissingPerson, { foreignKey: "reportedBy" });
MissingPerson.belongsTo(User, { foreignKey: "reportedBy" });

export default MissingPerson;
