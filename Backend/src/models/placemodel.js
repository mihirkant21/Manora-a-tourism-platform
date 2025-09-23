import db from "../Config/db.js";

export const getAllPlaces = (callback) => {
  db.all("SELECT * FROM places", [], callback);
};
