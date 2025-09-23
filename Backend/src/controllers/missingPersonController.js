import MissingPerson from "../models/MissingPerson.js";

export const reportMissing = async (req, res) => {
  try {
    const { name, age, gender, height, bodyMarks, clothing, description } = req.body;
    const person = await MissingPerson.create({ name, age, gender, height, bodyMarks, clothing, description });
    res.status(201).json({ message: "✅ Missing person reported", person });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMissingPersons = async (req, res) => {
  try {
    const persons = await MissingPerson.findAll();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
