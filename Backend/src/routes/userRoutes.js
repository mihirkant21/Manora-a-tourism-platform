import express from "express";

const router = express.Router();

// Example routes
router.get("/", (req, res) => {
  res.json({ message: "✅ Users route working" });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `✅ User with ID ${id} fetched successfully` });
});

export default router; // ✅ default export
