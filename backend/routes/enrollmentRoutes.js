import express from "express"
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

import { enrollStudent,getResult ,getEnrollments,getMyResult} from "../controllers/enrollmentController.js"

const router = express.Router()

router.post("/", protect, teacherOnly, enrollStudent);

router.get("/", protect, getEnrollments);

// Student apna result
router.get(
    "/my-result",
    protect,
    getMyResult
);

// Teacher/student specific result
router.get(
    "/student/:id/result",
    protect,
    getResult
);
export default router