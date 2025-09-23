// src/models/userModel.js
import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";  // ✅ Correct relative path

import User from "./userModel.js";
import Place from "./placemodel.js";

const Photo = sequelize.define("Photo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  url: { type: DataTypes.STRING, allowNull: false },
  caption: { type: DataTypes.TEXT },
});

User.hasMany(Photo, { foreignKey: "userId" });
Photo.belongsTo(User, { foreignKey: "userId" });

Place.hasMany(Photo, { foreignKey: "placeId" });
Photo.belongsTo(Place, { foreignKey: "placeId" });

export default Photo;
