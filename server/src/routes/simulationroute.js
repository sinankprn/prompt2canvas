import express from "express";
import { generateSimulation } from "../controllers/simcontroller.js";

const router = express.Router();

router.post("/generate", generateSimulation);

export default router;
