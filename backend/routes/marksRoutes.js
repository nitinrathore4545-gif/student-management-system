import express from "express"
import { createMarks } from "../controllers/marksController.js"

const router = express.Router()

router.post("/",createMarks)

export default router