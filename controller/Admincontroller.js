
const Admines = require('../models/adminModle');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')

// Get All Admins
const getAlladmins = asyncHandler( async (req,res) => {
    let data = await Admines.find();
    res.status(200).json(data)
})
// Get Single Admin
const getSingleAdmin = asyncHandler( async (req,res) => {
    let single_admin = await Admines.findById(req.params.id);
    res.status(200).json(single_admin)
})  
// Create Admin
const createAdmin = asyncHandler( async (req,res) => {
    const {name,email,call,password,location,skill,username} = req.body;
    // hash password 
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password,salt);
    if ( !name || !email || !call || !password || !username) {
        res.status(400).json({
            message: "All Fields are required"
        })
    }else{
        await Admines.create({
            ...req.body,
            password : hashpassword
        })
        res.status(201).json({
            message : "Create Admins"
        })
    }
})
// update Admin
const updateAdmin = asyncHandler( async (req,res) => {
  
     await Admines.findByIdAndUpdate(req.params.id,req.body,{
        new : true
     });
    res.status(200).json({
        message : "Admin update"
    })
})
// Deleted Admin
const deletedAdmin = asyncHandler( async (req,res) => {
     const delete_Data = Admines.findById(req.params.id);
     if ( !delete_Data ) {
        res.status(400).json({
            message : "Admin data not Found"
        });
     }else{
        const data = await Admines.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message : `Deleted ${data.name} data`
        })
     }
    res.status(200).json(data)
})

module.exports = {
    getAlladmins,
    getSingleAdmin,
    createAdmin,
    updateAdmin,
    deletedAdmin
}