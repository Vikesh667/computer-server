const User=require("../Modals/userModal")
const bcrypt=require("bcrypt")

const securePassword = async (password) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };
const register=async(req,res)=>{
       const {name,email,mobile,password}=req.body
       const spassword = await securePassword(req.body.password);
   const userData=  await User.findOne({email})
   if(userData){
    res.status(200).send({message:"This email is already exist"})
   }else{
    const user=new User({
        name,
        email,
        mobile,
        password:spassword,
        image:req.file.filename,
   })
    user.save()
   res.status(200).send({message:"User Successfully register",user})
}
}

const loginUser=async(req,res)=>{
    try{

       const email=req.body.email
        const password=req.body.password
        const userData=await User.findOne({email:email})
     
        if(userData){
            const passwordMatch=await bcrypt.compare(password,userData.password)
             if(passwordMatch){
                res.status(200).send({message:"User loged in successfully",userData})
             }else{
                res.status(200).send({message:"your password is invalid"})
             }
        }else{
            res.status(200).send({message:"Your email dosen't exist"})
        }
    }catch(error){
     res.status(400).send(error.message)
    }
  
}
module.exports={
    register,
    loginUser
}