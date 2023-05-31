const express=require("express")
const Student=require("../Modals/studentInfo")
const cors=require('cors')
const student_route=express()

student_route.use(express.json())
student_route.use(cors())
student_route.use(express.urlencoded({extended:true}))

const multer=require("multer")
const path= require("path");

student_route.use(express.static("public"))
const storage= multer.diskStorage({
    destination:function(req,file,cb){
     cb(null,path.join(__dirname,"../public/userImages"),function(error,success){
        if(error){
            console.log(error)
        }
     })
    },
    filename:function(req,file,cb){
     const name = Date.now()+'-'+file.originalname
     cb(null,name,function(error,success){
        if(error){
            console.log(error)
        }
     })
    }
})
const upload=multer({storage:storage})
const studentController=require("../userController/studentController")
student_route.post('/adminsionform',upload.single("image"),studentController.form)
student_route.get('/getFrom',studentController.getFromData)
module.exports=student_route