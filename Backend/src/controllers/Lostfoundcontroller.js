import LostFound from "../models/lostFoundModel.js";

// ➡️ Add new item
export const addItem = async (req, res) => {
  try {
    const { itemName, location, description, date, contactNo, status, userId } = req.body;

    if (!itemName || !location || !date || !contactNo || !status) {
      return res.status(400).json({ error: "❌ Required fields missing" });
    }

    const item = await LostFound.create({ itemName, location, description, date, contactNo, status, userId });
    res.status(201).json({ message: "✅ Item added", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➡️ Get all items
export const getItems = async (req, res) => {
  try {
    const items = await LostFound.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➡️ Get single item
export const getItemById = async (req, res) => {
  try {
    const item = await LostFound.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "❌ Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
