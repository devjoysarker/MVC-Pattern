
const mongoose = require('mongoose');


const modleStudent = mongoose.Schema({
    name : String,
    skill : String,
    age : String,
    location : String,
},{
    timestamps : true
})


module.exports = mongoose.model("Studentdata",modleStudent)