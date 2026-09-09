import { createCourse,getAllCourses } from "../models/CourseModel.js"

export const addCourse = async(req,res)=>{
    try{
        const result = await createCourse(req.body)

        res.status(201).json({
            success:true,
            message :"Course Created Successfully",
            courseId:result.insertId
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Failed to create Course"
        })
    }
}

export const getCourses = async(req,res)=>{
    try{
        const courses = await getAllCourses()
        res.status(200).json({
            success:true,
            count:courses.length,
            data:courses
        })
    }catch(error){
        console.error(error)

        res.status(500).json({
            success:false,
            message:"Failed to Fetch courses"
        })
    }
}