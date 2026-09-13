import express from "express"
import { createMarks } from "../controllers/marksController.js"
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router()
router.post("/", protect, teacherOnly, createMarks);

export default router