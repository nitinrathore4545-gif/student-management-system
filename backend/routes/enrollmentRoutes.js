import express from "express"

import { enrollStudent,getResult ,getEnrollments} from "../controllers/enrollmentController.js"

const router = express.Router()

router.post("/",enrollStudent)

router.get("/", getEnrollments);

router.get("/student/:id/result",getResult)

export default router