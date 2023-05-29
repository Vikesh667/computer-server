const mongoose=require("mongoose")


const userScheam=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  is_admin:{
    type:Number,
    required:true
  },
  is_verifyed:{
    type:Number,
    default:0
  }
})
const User=new mongoose.model("User",userScheam)
module.exports=User
