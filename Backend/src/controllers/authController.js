// src/controllers/authController.js
import User from "../models/userModel.js";

// ✅ Signup Controller
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ error: "⚠️ All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "⚠️ Email already registered" });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password, // ⚠️ should be hashed in production!
    });

    res.status(201).json({
      message: "✅ Signup successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "⚠️ Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ error: "❌ Invalid credentials" });
    }

    res.json({
      message: "✅ Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "❌ Server error during login" });
  }
};
