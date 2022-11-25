
const modleStudent = require('../models/studentModel');
const asyncHandler = require('express-async-handler');

// Get all Students
const getAllStudents = asyncHandler( async (req,res) => {
    let data = await modleStudent.find();
    res.status(201).json(data);
})
// Get all Singgle Students
const getAllSingleStudents = asyncHandler( async (req,res) => {

    let single_data = await modleStudent.findById(req.params.id);
    res.status(201).json(single_data);
})
// Create Stuents
const CreateStudents = asyncHandler( async (req,res) => {
    let data = await modleStudent.create({
        name: req.body.name,
        skill: req.body.skill,
        age: req.body.age,
        location: req.body.location,
    });
    res.status(201).json({
        message : "Studnet data create"
    });
})
// Update Stuents
const updateStudents = asyncHandler( async (req,res) => {
    await modleStudent.findByIdAndUpdate(req.params.id,req.body,{
        new : true
    })
    res.status(201).json({
        message : "Students updated"
    });
})
// Delete Stuents
const deleteStudents = asyncHandler( async (req,res) => {
    await modleStudent.findByIdAndDelete(req.body.id)
    res.status(201).json(data);
})

module.exports = {
    getAllStudents,
    getAllSingleStudents,
    CreateStudents,
    updateStudents,
    deleteStudents
}