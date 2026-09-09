import pool from "../config/db.js";

export const createStudent = async (student)=>{
    const {name,email,phone,age,course} = student

    const [result]= await pool.query(
        `INSERT INTO students(name,email,phone,age,course)
        VALUES(?,?,?,?,?)`,
        [name,email,phone,age,course]
    )
    return result
}

export const getAllStudents = async (page=1,limit=5) =>{
    const offset = (page-1) * limit;

    const [rows] = await pool.query(
        `SELECT * FROM students ORDER BY id DESC LIMIT ? OFFSET ?`,
        [limit,offset]
    )
    return rows
}


export const getStudentById = async(id)=>{
    const [rows] = await pool.query(
        "SELECT * FROM students WHERE id= ?",
       [id]
    )
    return rows[0]
}

export const updateStudent = async (id,student)=>{
    const {name,email,phone,age,course}=student
    const [result] = await pool.query(
        `UPDATE students 
        SET name=?,email=?,phone=?,age=?,course=?
        WHERE id=?`,
        [name,email,phone,age,course,id]
    )
    return result
}

export const deleteStudent = async(id)=>{
    const [result] = await pool.query(
        "DELETE FROM students WHERE id=?",
        [id]
    )
    return result
}

export const searchStudents = async(name)=>{
    const [rows] = await pool.query(
        `SELECT * FROM students WHERE name LIKE ? OR email LIKE ?
        ORDER BY id DESC`,
        [`%${name}%`,`%${name}%`]
    )
    return rows
}