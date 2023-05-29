const express=require("express")
const User=require("../Modals/userModal")
const cors=require('cors')
const user_route=express()

user_route.use(express.json())
user_route.use(cors())
user_route.use(express.urlencoded({extended:true}))


const multer=require("multer")
const path= require("path");

user_route.use(express.static("public"))
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
const userController=require("../userController/userController")
user_route.post('/register',upload.single("image"),userController.register)
user_route.post("/login",userController.loginUser)
user_route.get('/verify',userController.verifyMail)



module.exports=user_route





