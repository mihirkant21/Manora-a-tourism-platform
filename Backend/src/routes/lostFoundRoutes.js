import express from "express";
import { addItem, getItems, getItemById } from "../controllers/Lostfoundcontroller.js";

const router = express.Router();

router.post("/", addItem);
router.get("/", getItems);
router.get("/:id", getItemById);

export default router;
