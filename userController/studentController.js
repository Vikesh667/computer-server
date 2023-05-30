const Student = require("../Modals/studentInfo");
const form = async (req, res) => {

    try{
       const name=req.body.name
       const email=req.body.email
       const image= req.file.filename
       const mobile=req.body.mobile
       const gender=req.body.gender
       const dob=req.body.dob
       const fatherName=req.body.fatherName
       const motherName=req.body.motherName
       const parentContact=req.body.parentContact
       
       const adharNo=req.body.adharNo
       const address=req.body.address
       const studentDetail=await  Student.findOne({email})
       if(studentDetail){
          res.status(201).send({message:"abe kitni bar ek hi form ko submitg karega berojgar kahika"}) 
       }else{
        
           const student=new Student({
               name,
               email,
               mobile,
               image: req.file.filename,
               gender,
               dob,
               fatherName,
               motherName,
               parentContact,
               adharNo,
               address
               
           })
           const studentDetails=await student.save()
           res.status(200).send({message:"bhai tumhara form submit ho gya hai ab thoda ruk",studentDetails})
       }
       
    }catch(error){
       console.log(error.message)
    }
 
}
module.exports = {
  form,
};
