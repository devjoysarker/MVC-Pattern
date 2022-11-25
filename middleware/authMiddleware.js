

const jwt = require('jsonwebtoken');
const Admins = require('../models/adminModle');

// Auth  middleware

const authCheck = async(req,res,next) => {

    if ( req.headers.authorization ) {
        try {
            // Get token
            const token = req.headers.authorization.split(' ')[1];
            // verfiy Token
            const { id } = jwt.verify(token,process.env.JWT_SECRET);
            // get verify token
            req.user = await Admins.findById(id)
            next()
            
        } catch (error) {
            console.log(error);
        }
        
    }else{
        res.json({
            message : "Token not found"
        })
    }
}

module.exports = authCheck