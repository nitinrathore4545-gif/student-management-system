import { createCourse,getAllCourses } from "../models/CourseModel.js"
import pool from "../config/db.js";

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
export const deleteCourse = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const { id } = req.params;

        await connection.beginTransaction();

        // 1. Delete marks related to this course
        await connection.query(
            `
            DELETE m
            FROM marks m
            JOIN enrollments e
                ON m.enrollment_id = e.id
            WHERE e.course_id = ?
            `,
            [id]
        );

        // 2. Delete enrollments
        await connection.query(
            "DELETE FROM enrollments WHERE course_id = ?",
            [id]
        );

        // 3. Delete course
        const [result] = await connection.query(
            "DELETE FROM courses WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            await connection.rollback();

            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        await connection.commit();

        res.json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        await connection.rollback();

        console.error("DELETE COURSE ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    } finally {
        connection.release();
    }
};