import express from "express";
import { getPhotos } from "../controllers/photocontroller.js";

const router = express.Router();

router.get("/", getPhotos);

export default router;
