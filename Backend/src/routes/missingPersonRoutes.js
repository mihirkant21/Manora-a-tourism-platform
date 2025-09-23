import express from "express";
import { reportMissing, getMissingPersons } from "../controllers/missingPersonController.js";

const router = express.Router();

router.post("/", reportMissing);
router.get("/", getMissingPersons);

export default router;
