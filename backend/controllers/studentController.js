import { createStudent,getAllStudents,getStudentById,updateStudent,deleteStudent,searchStudents } from "../models/studentModel.js";

export const addStudent = async(req,res)=>{
    try{
        const result = await createStudent(req.body)

        res.status(201).json({
            success:true,
            message:"Student created Successfully",
            studentId : result.insertId
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:'Failed to Create Student'
        })
    }
}

export const getStudents = async (req,res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5
        const students = await getAllStudents(page,limit)
        res.status(200).json({
            success:true,
            page,
            limit,
            count : students.length,
            data : students
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Failed to Fetch students"
        })
    }
}
export const getStudent = async(req,res)=>{
    try{
        const student = await getStudentById(req.params.id)
        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }
        res.status(200).json({
            success:true,
            data:student
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Failed to Fetch student"
        })
    }
}

export const updateStudentData = async (req,res)=>{
    try{
        const id = req.params.id
        const existingStudent = await getStudentById(id)

        if(!existingStudent){
            return res.status(404).json({
                success:false,
                message:"Student not Found"
            })
        }
        const result = await updateStudent(id,req.body)
        res.status(200).json({
            success:true,
            message:"Student Updated successfully"
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Failed to update Student"
        })
    }
}

export const removeStudent = async(req,res) =>{
    try{
        const id = req.params.id
        const result = await deleteStudent(id)
        if(result.affectedRows===0){
            return res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Student deleted Successfully"
        })
    }catch(error){
        console.error(error)

        res.status(500).json({
            success:false,
            message:"Failed to delete student"
        })

    }
}

export const SearchStudents = async (req,res)=>{
    try{
        const {name} = req.params
        const students = await searchStudents(name)
        res.status(200).json({
            success:true,
            count:students.length,
            data : students
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Search Failed"
        })
    }
}