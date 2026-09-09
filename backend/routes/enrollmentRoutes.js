import express from "express"

import { enrollStudent,getResult } from "../controllers/enrollmentController.js"

const router = express.Router()

router.post("/",enrollStudent)

router.get("/student/:id/result",getResult)

export default router