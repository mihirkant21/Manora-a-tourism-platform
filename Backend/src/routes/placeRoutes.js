import express from "express";
import { getPlaces } from "../controllers/placecontroller.js";

const router = express.Router();

router.get("/", getPlaces);

export default router;
