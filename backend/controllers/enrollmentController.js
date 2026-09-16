import { createEnrollment,getStudentResult } from "../models/enrollmentModel.js";
import pool from "../config/db.js"

export const enrollStudent = async(req,res)=>{
    try{
        const {student_id,course_id} = req.body
        if(!student_id || !course_id){
            return res.status(400).json({
                success:false,
                message:"student_id and course_id are required"
            })
        }
        const result = await createEnrollment(student_id,course_id)
        res.status(200).json({
            success:true,
            message:"course assigned successfully",
            enrollmentId:result.insertId
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Failed to assign course"
        })
    }
}

export const getResult = async (req,res)=>{
    try{
        if (req.user.role === "student") {
    const [rows] = await pool.query(
        "SELECT id FROM students WHERE email = ?",
        [req.user.email]
    );

    if (rows.length === 0 || rows[0].id !== Number(req.params.id)) {
        return res.status(403).json({
            success: false,
            message: "You can only view your own result"
        });
    }
}
        const studentId = req.params.id
        const result = await getStudentResult(studentId)
        if(result.length===0){
            return res.status(404).json({
                success:false,
                message:"Result not found"
            })
        }
        const totalMarks = result.reduce(
            (sum,item) => sum + item.marks,0
        )
        const totalMaxMarks = result.reduce(
            (sum,item) => sum + item.max_marks,0
        )
        const percentage = (totalMarks/totalMaxMarks) * 100
        let grade;
        if(percentage >=90){
            grade = "A+"
        }else if(percentage>=80){
            grade="A"
        }else if(percentage>=70){
            grade="B"
        }else if(percentage>=60){
            grade = "C"
        }else if(percentage>=50){
            grade = "D"
        }else{
            grade = "F"
        }
        res.status(200).json({
            success:true,
            student:{
                id:result[0].student_id,
                name : result[0].student_name,
                email : result[0].email,
                course:result[0].course_name
            },
            subjects : result,
            summary:{
                totalMarks,
                totalMaxMarks,
                percentage : percentage.toFixed(2),
                grade
            }
        })
        }catch(error){
            console.error(error)
            res.status(500).json({
                success:false,
                message:"Failed to Fetch result"
            })
        }
}
export const getEnrollments = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                e.id AS enrollment_id,
                s.id AS student_id,
                s.name AS student_name,
                c.id AS course_id,
                c.course_name
            FROM enrollments e
            JOIN students s
                ON e.student_id = s.id
            JOIN courses c
                ON e.course_id = c.id
            ORDER BY e.id DESC
        `);

        res.json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enrollments"
        });
    }
};

// =========================
// GET LOGGED-IN STUDENT RESULT
// =========================

export const getMyResult = async (req, res) => {

    try {

        const studentEmail = req.user.email;

        const [students] = await pool.query(
            `
            SELECT id
            FROM students
            WHERE email = ?
            `,
            [studentEmail]
        );

        if (students.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Student record not found"
            });
        }

        // Existing result function ko reuse kar rahe hain
        req.params.id = students[0].id;

        return getResult(req, res);

    } catch (error) {

        console.error(
            "GET MY RESULT ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch your result"
        });
    }
};
