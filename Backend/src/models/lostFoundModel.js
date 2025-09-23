import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";   // ✅ corrected path
import User from "./userModel.js";

const LostFound = sequelize.define("LostFound", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  itemName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE, allowNull: false },
  contactNo: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM("lost", "found"), allowNull: false },
});

// Relations
User.hasMany(LostFound, { foreignKey: "userId" });
LostFound.belongsTo(User, { foreignKey: "userId" });

export default LostFound;
