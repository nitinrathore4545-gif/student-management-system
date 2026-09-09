
import pool from "../config/db.js"

export const addMarks = async (mark)=>{
      const {enrollment_id,subject,marks,max_marks=100}=mark
      const [result] = await pool.query(
        `INSERT INTO marks
        (enrollment_id,subject,marks,max_marks)
        VALUES(?,?,?,?)`,
        [enrollment_id,subject,marks,max_marks]
      )
      return result
}