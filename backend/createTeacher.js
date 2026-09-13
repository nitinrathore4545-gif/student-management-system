import bcrypt from "bcryptjs";
import pool from "./config/db.js";

const password = await bcrypt.hash("teacher123", 10);

await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [
        "Teacher",
        "teacher@gmail.com",
        password,
        "teacher"
    ]
);

console.log("Teacher created successfully");

process.exit();