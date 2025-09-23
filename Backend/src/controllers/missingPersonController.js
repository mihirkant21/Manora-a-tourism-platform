import MissingPerson from "../models/MissingPerson.js";

export const reportPerson = async (req, res) => {
  try {
    const { name, age, lastSeenLocation, description, contactNo } = req.body;
    const person = await MissingPerson.create({ name, age, lastSeenLocation, description, contactNo });
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPersons = async (req, res) => {
  const persons = await MissingPerson.findAll();
  res.json(persons);
};

export const getPersonById = async (req, res) => {
  const person = await MissingPerson.findByPk(req.params.id);
  if (!person) return res.status(404).json({ error: "Person not found" });
  res.json(person);
};

export const updatePerson = async (req, res) => {
  const person = await MissingPerson.findByPk(req.params.id);
  if (!person) return res.status(404).json({ error: "Person not found" });

  await person.update(req.body);
  res.json(person);
};

export const deletePerson = async (req, res) => {
  const person = await MissingPerson.findByPk(req.params.id);
  if (!person) return res.status(404).json({ error: "Person not found" });

  await person.destroy();
  res.json({ message: "Person deleted" });
};
