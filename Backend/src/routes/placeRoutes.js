import express from "express";
import { getPlaces } from "../controllers/placeController.js";

const router = express.Router();
router.get("/", getPlaces);
export default router;
