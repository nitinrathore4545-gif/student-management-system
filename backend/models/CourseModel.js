import pool from  "../config/db.js"

export const createCourse = async (course) => {
    const {course_name,duration}=course

    const[result]=await pool.query(
        `INSERT INTO courses(course_name,duration)
        VALUES(?,?)`,
        [course_name,duration]
    )
    return result
}

export const getAllCourses = async ()=>{
    const [rows] = await pool.query(
        "SELECT * FROM courses ORDER BY id DESC"
    )

    return rows
}