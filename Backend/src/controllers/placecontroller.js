import { getAllPlaces } from "../models/placeModel.js";

export const getPlaces = (req, res) => {
  getAllPlaces((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
