import express from "express";

import {
    addCourse,
    getCourses,
    deleteCourse
} from "../controllers/courseController.js";

import {
    protect,
    teacherOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    teacherOnly,
    addCourse
);

router.get(
    "/",
    protect,
    getCourses
);

router.delete(
    "/:id",
    protect,
    teacherOnly,
    deleteCourse
);

export default router;