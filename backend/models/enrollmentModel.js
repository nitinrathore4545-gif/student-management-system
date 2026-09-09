import pool from "../config/db.js"

export const createEnrollment = async (student_id,course_id)=>{
    const [result] = await pool.query(
        `INSERT INTO enrollments(student_id,course_id)
        VALUES(?,?)`,
        [student_id,course_id]
    )
    return result
}

export const getStudentResult = async (studentId) =>{
    const [rows] = await pool.query(
        `
        SELECT s.id as student_id,
        s.name as student_name,
        s.email ,
        c.course_name,
        m.subject,
        m.marks,
        m.max_marks
        FROM enrollments e 
        join  students s 
        on e.student_id = s.id
        join courses c on
        e.course_id = c.id
        join marks m 
        on e.id = m.enrollment_id
        where s.id = ? ORDER BY m.id
        `,
        [studentId]
    )
    return rows
}