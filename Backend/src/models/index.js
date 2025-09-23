// src/models/index.js
import sequelize from "../config/db.js";

// Import models
import User from "./userModel.js";
import LostFound from "./lostFoundModel.js";
import MissingPerson from "./MissingPerson.js";
import Photo from "./photoModel.js";
import Place from "./placemodel.js";

// ✅ Define associations
User.hasMany(LostFound, { foreignKey: "userId" });
LostFound.belongsTo(User, { foreignKey: "userId" });

User.hasMany(MissingPerson, { foreignKey: "reportedBy" });
MissingPerson.belongsTo(User, { foreignKey: "reportedBy" });

User.hasMany(Photo, { foreignKey: "userId" });
Photo.belongsTo(User, { foreignKey: "userId" });

Place.hasMany(Photo, { foreignKey: "placeId" });
Photo.belongsTo(Place, { foreignKey: "placeId" });

// ✅ Initialize DB
export const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true }); // auto create/alter tables
    console.log("✅ All models synced successfully");
    console.log("📦 Models:", Object.keys(sequelize.models));
  } catch (err) {
    console.error("❌ Error syncing models:", err);
  }
};

export { sequelize, User, LostFound, MissingPerson, Photo, Place };
