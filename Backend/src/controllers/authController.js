import User from "../models/userModel.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "✅ Signup successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "✅ Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
