import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import studentRoutes from "./routes/studentRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
import marksRoutes from "./routes/marksRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import helmet from "helmet"

import pool from "./config/db.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/api/students",studentRoutes)
app.use("/api/courses",courseRoutes)
app.use("/api/enrollments",enrollmentRoutes)
app.use("/api/marks",marksRoutes)
app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message : "Student Management API is working"
    })
})

app.get("/api/test-db",async (req,res)=>{
    try{
        const [result] = await pool.query("SELECT 1 AS result")

        res.json({
            success:true,
            message:"Database connected successfully",
            result
        })
    }catch(error){
        console.log(error)

        res.status(500).json({
            success:false,
            message:"Database connection failed"
        })
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})