const mongoose=require("mongoose")


const studentScheam=new mongoose.Schema({
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
  image:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  dob:{
    type:String,
    required:true
  },
  fatherName:{
    type:String,
    required:true
  },
  motherName:{
    type:String,
    required:true
  },
  parentContact:{
    type:String,
    required:true
  },
  adharNo:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  

})
const Student=new mongoose.model("Student",studentScheam)
module.exports=Student