


const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModle = require('../models/adminModle');


const adminLogin = asyncHandler( async(req,res) => {
    const { email,password } = req.body;
    
    // Check user by email
    const login_data = await adminModle.findOne({ email})
    //Now validate Email
    if ( !login_data ) {
        res.status(400).json({
            message : "Email not found"
        })
    }
    // Now validate by authintion by password

    if ( await bcrypt.compare(password,login_data.password) ) {
        const token = jwt.sign({ id : login_data._id },process.env.JWT_SECRET,{
            expiresIn : "1d"
        });
        res.status(200).json({
            id : login_data._id,
            name : login_data.name,
            email : login_data.email,
            call : login_data.call,
            token : token
        });
        console.log(login_data);
    }else{
        res.status(400).json({
            message : "Worng password"
        })
    }
});

// Auth Exports
module.exports = adminLogin