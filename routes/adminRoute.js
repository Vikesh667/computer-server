const express=require("express")
const cors=require("cors")
const admin_route=express()

admin_route.use(express.json())
admin_route.use(express.urlencoded({extended:true}))
admin_route.use(cors())
const adminController=require("../userController/adminController")
admin_route.post('/admin',adminController.verifyLogin)
module.exports=admin_route