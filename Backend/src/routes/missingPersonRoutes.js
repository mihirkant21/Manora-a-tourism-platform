import express from "express";
const router = express.Router();

// Temporary in-memory store (later we’ll move to DB)
let missingPersons = [];

// ➡️ Add a new missing person report
router.post("/", (req, res) => {
  const { name, age, gender, height, bodyMarks, clothing, description } = req.body;

  if (!name || !age || !gender) {
    return res.status(400).json({ error: "Name, age, and gender are required" });
  }

  const newCase = {
    id: missingPersons.length + 1,
    name,
    age,
    gender,
    height,
    bodyMarks,
    clothing,
    description,
    createdAt: new Date(),
  };

  missingPersons.push(newCase);

  res.status(201).json({ message: "Missing person reported", data: newCase });
});

// ➡️ Get all missing person cases
router.get("/", (req, res) => {
  res.json(missingPersons);
});

// ✅ FIX: Default export
export default router;
