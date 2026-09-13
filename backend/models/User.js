import pool from "../config/db.js"

const User = {
    create : async  (name,email,password,role) =>{
        const [result] = await pool.query(
            `INSERT INTO users(name,email,password,role)
            VALUES(?,?,?,?)`,
            [name,email,password,role]
        )
        return result
    },
    findByEmail : async (email) =>{
        const [rows] = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )
        return rows[0]
    
}
}

export default User

