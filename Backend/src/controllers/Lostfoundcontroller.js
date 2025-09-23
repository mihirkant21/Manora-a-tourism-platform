import LostFound from "../models/LostFound.js";

export const createItem = async (req, res) => {
  try {
    const { itemName, location, description, date, contactNo } = req.body;
    const item = await LostFound.create({ itemName, location, description, date, contactNo });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getItems = async (req, res) => {
  const items = await LostFound.findAll();
  res.json(items);
};

export const getItemById = async (req, res) => {
  const item = await LostFound.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

export const updateItem = async (req, res) => {
  const item = await LostFound.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  await item.update(req.body);
  res.json(item);
};

export const deleteItem = async (req, res) => {
  const item = await LostFound.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  await item.destroy();
  res.json({ message: "Item deleted" });
};
