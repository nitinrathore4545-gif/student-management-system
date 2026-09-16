import bcrypt from "bcryptjs";
import pool from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const createTeacher = async () => {

    try {

        const name = "Admin Teacher";
        const email = "teacher@college.com";
        const password = "Teacher@123";

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const [existingUser] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {

            console.log(
                "Teacher already exists"
            );

            process.exit();
        }

        await pool.query(
            `
            INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, ?)
            `,
            [
                name,
                email,
                hashedPassword,
                "teacher"
            ]
        );

        console.log(
            "Teacher account created successfully!"
        );

        process.exit();

    } catch (error) {

        console.error(
            "Teacher creation failed:",
            error
        );

        process.exit(1);
    }
};

createTeacher();