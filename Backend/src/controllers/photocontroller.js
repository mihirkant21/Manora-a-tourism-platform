import Photo from "../models/photoModel.js";

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
