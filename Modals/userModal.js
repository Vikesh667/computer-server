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
  }
})
const User=new mongoose.model("User",userScheam)
module.exports=User
