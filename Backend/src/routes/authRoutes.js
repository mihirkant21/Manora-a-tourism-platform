// src/routes/authRoutes.js
import express from "express";

const router = express.Router();

// Signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ message: "✅ Signup route working", data: { name, email } });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ message: "✅ Login route working", data: { email } });
});

export default router; // 👈 VERY IMPORTANT
