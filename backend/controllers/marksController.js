import { addMarks } from "../models/MarksModel.js";

export const createMarks = async(req,res)=>{
    try{
        const {enrollment_id,subject,marks,max_marks} = req.body

        if(!enrollment_id|| !subject || marks=== undefined){
           return res.status(400).json({
            success:false,
            message:"enrollment_id,subject and marks are required"
           })
        }
        const result = await addMarks({
            enrollment_id,
            subject,
            marks,
            max_marks
        })
        res.status(201).json({
         success:true,
         message:"Marks added successfully",
         markId:result.insertId
        })
    }catch(error){
        console.error(error)

        res.status(500).json({
            success:false,
            message:"Failed to add marks"
        })
    }
}