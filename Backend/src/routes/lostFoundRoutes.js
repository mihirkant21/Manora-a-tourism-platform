// routes/lostFoundRoutes.js
import express from "express";

const router = express.Router();

// GET all lost & found items
router.get("/", (req, res) => {
  res.json({
    message: "✅ Lost & Found items fetched successfully",
    items: [
      {
        id: 1,
        itemName: "Black Wallet",
        location: "Temple Entrance",
        description: "Lost near the big banyan tree",
        date: "2025-09-20",
        contactNo: "9876543210",
      },
      {
        id: 2,
        itemName: "Gold Ring",
        location: "Market Area",
        description: "Found near fruit shop",
        date: "2025-09-18",
        contactNo: "9123456780",
      },
    ],
  });
});

// POST new lost/found item
router.post("/", (req, res) => {
  const { itemName, location, description, date, contactNo } = req.body;

  if (!itemName || !location || !description || !date || !contactNo) {
    return res.status(400).json({ error: "❌ Missing required fields" });
  }

  res.json({
    message: "✅ Lost & Found item added successfully",
    item: { itemName, location, description, date, contactNo },
  });
});

// GET single lost/found item by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: `✅ Lost & Found item with ID ${id} fetched successfully`,
    item: {
      id,
      itemName: "Mock Item",
      location: "Mock Location",
      description: "Mock description",
      date: "2025-09-21",
      contactNo: "9999999999",
    },
  });
});

export default router;
