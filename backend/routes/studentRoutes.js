import express from "express"
import { addStudent,getStudent,getStudents,updateStudentData,removeStudent,SearchStudents } from "../controllers/studentController.js"

const router = express.Router()

router.post("/",addStudent)

router.get("/",getStudents)

router.get("/search/:name",SearchStudents)

router.get("/:id",getStudent)

router.put("/:id",updateStudentData)

router.delete("/:id",removeStudent)

export default router