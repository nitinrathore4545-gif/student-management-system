
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create(
            name,
            email,
            hashedPassword,
            "student"
        );

        res.status(201).json({
            success: true,
            message: "Student registered successfully"
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

export const login = async(req,res) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            })
        }
        const user = await User.findByEmail(email)

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        const ispasswordValid = await bcrypt.compare(
            password,
            user.password
        )
        if(!ispasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        const token = jwt.sign({
            id:user.id,
            role:user.role,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:  "1d"
        }
    )
    res.json({
        success:true,
        message:"Login Successful",
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    })
    }catch(error){
        console.error("LOGIN ERROR:",error)
        res.status(500).json({
            success:false,
            message:"Login Failed"
        })
    }
}