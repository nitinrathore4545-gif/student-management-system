import express from "express";
import {
    addStudent,
    getStudents,
    getStudent,
    updateStudentData,
    removeStudent,
    SearchStudents
} from "../controllers/studentController.js";

import {
    protect,
    teacherOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, teacherOnly, addStudent);

router.get("/", protect, getStudents);

router.get(
    "/search/:name",
    protect,
    SearchStudents
);

router.get(
    "/:id",
    protect,
    getStudent
);

router.put(
    "/:id",
    protect,
    teacherOnly,
    updateStudentData
);

router.delete(
    "/:id",
    protect,
    teacherOnly,
    removeStudent
);

export default router;