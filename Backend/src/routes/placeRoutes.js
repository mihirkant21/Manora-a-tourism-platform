import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "✅ Place route working" });
});

export default router; // ✅ default export
