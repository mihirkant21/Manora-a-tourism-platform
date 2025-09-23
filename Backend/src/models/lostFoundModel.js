import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";
import User from "./User.js";

const LostFound = sequelize.define("LostFound", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  itemName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("lost", "found"), allowNull: false },
});

User.hasMany(LostFound, { foreignKey: "userId" });
LostFound.belongsTo(User, { foreignKey: "userId" });

export default LostFound;
