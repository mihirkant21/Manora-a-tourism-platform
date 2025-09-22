import db from "../config/db.js";

export const getAllPlaces = (callback) => {
  db.all("SELECT * FROM places", [], callback);
};
