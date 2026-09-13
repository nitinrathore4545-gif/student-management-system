import express from "express"
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

import { enrollStudent,getResult ,getEnrollments} from "../controllers/enrollmentController.js"

const router = express.Router()

router.post("/", protect, teacherOnly, enrollStudent);
router.get("/", protect, getEnrollments);
router.get(
    "/student/:id/result",
    protect,
    getResult
);

export default router