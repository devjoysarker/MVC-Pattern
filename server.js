
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const colors = require('colors');
const connectDB = require('./config/db');
const path = require('path');


// Multer mangae form dat
const multer = require('multer');

const stroage = multer.diskStorage({
    destination: (req,file,cb) => {
        if (file.fieldname == 'photo') {
            cb(null,'./media/users/')
        }else if (file.fieldname == 'cv'){
            cb(null,'./media/users/cv/')
        }
    },
  filename : (req,file,cb) => {
    if( file.fieldname == 'photo' ){
        const extname = path.extname(file.originalname);
        filename = Date.now() + '_' + Math.round(Math.random() * 1000) + extname
       
        cb(null,filename) 
    } else if( file.fieldname == 'cv' ) {

        let data = new Date();
        let current_data = data.getMonth()+'-'+ data.getDate()+ '-'+ data.getFullYear();
        let filename = current_data+ file.originalname
        cb(null,filename)
    }  
  }
});

const upload = multer({
    storage : stroage,
    limits : (1042 * 1024),

    fileFilter : (req,file,cb) =>{

        if(file.fieldname == 'photo'){
            if (file.mimetype == 'image/jpeg' || file.mimetype == "image/jpg" || file.name == 'png' || file.mimetype == 'image/gif') {
                cb(null,true)
            }else{
                cb(console.log('Photo type invaild'));
            }
        }else if( file.fieldname == 'cv' ){
            if (file.mimetype == 'application/pdf') {
                cb(null,true)
            }else{
                cb(console.log('Cv type invaild'));
            }
        }

    }
})

 

// DataBase Connection

const PORT = process.env.SERVER_PORT;

// Requesting body init
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// muleter uploads fields
const cpupload = upload.fields ([
    {
        name : 'photo',
        maxCount : 10
    },
    {
        name : 'cv',
        maxCount : 1
    }
])

// Photo upload
app.post('/upload', cpupload ,(req,res) => {
    console.log(req.files);
})


// MongoDB connection
connectDB()

// Students Routes  use
app.use('/api/student',require('./router/Student'));
app.use('/api/adminstion',require('./router/Admin'));
// And express Server

app.listen(PORT, () => {
    console.log(`server is runing on ${PORT} Port`);
})
