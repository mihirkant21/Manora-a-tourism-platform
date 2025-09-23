import Place from "../models/placeModel.js";


export const getPlaces = async (req, res) => {
  try {
    const places = await Place.findAll();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
