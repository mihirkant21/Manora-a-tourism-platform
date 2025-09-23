import Place from "../models/Place.js";

export const createPlace = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const place = await Place.create({ name, description, location });
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPlaces = async (req, res) => {
  const places = await Place.findAll();
  res.json(places);
};

export const getPlaceById = async (req, res) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) return res.status(404).json({ error: "Place not found" });
  res.json(place);
};

export const updatePlace = async (req, res) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) return res.status(404).json({ error: "Place not found" });

  await place.update(req.body);
  res.json(place);
};

export const deletePlace = async (req, res) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) return res.status(404).json({ error: "Place not found" });

  await place.destroy();
  res.json({ message: "Place deleted" });
};
