
const mongoose = require('mongoose');

// Admin modle Schma
const modleAdmin = mongoose.Schema({
    name : {
        type : String,
        require : [true,"name filds are required"]
    },
    email : {
        type : String,
        require : [true,"Email filds are required"],
        unique : true
    },
    call : {
        type : String,
        require : [true,"Call Name is required"]
    },
    username : {
        type : String,
        require : [true,"User-name filds are required"],
        lowercase : true,
        minlength : 6,
        maxlength : 10
    },
    location : {
        type : String,
        require : false
    },   
     skill : {
        type : String,
    },
    password : String
},
{
    timestamps : true
})



module.exports = mongoose.model('Sadmin',modleAdmin)
