import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";

const Place = sequelize.define("Place", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
});

export default Place;
