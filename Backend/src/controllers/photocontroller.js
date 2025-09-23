import Photo from "../models/Photo.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { url, description } = req.body;
    const photo = await Photo.create({ url, description });
    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPhotos = async (req, res) => {
  const photos = await Photo.findAll();
  res.json(photos);
};

export const getPhotoById = async (req, res) => {
  const photo = await Photo.findByPk(req.params.id);
  if (!photo) return res.status(404).json({ error: "Photo not found" });
  res.json(photo);
};

export const deletePhoto = async (req, res) => {
  const photo = await Photo.findByPk(req.params.id);
  if (!photo) return res.status(404).json({ error: "Photo not found" });

  await photo.destroy();
  res.json({ message: "Photo deleted" });
};
