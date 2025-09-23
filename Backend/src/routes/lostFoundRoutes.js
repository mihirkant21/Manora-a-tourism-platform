import express from "express";
import { addItem, getItems, getItemById } from "../controllers/Lostfoundcontroller.js";

const router = express.Router();

router.post("/", addItem);     // ➡️ POST /lost-found
router.get("/", getItems);     // ➡️ GET /lost-found
router.get("/:id", getItemById); // ➡️ GET /lost-found/:id

export default router;
