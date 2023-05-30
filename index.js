const express=require("express")
const mongoose=require('mongoose')

const app=express()
app.use(express.json())

mongoose.connect("mongodb+srv://vikesh667kumar:test123@test.pqappvm.mongodb.net/test")

const userRoute=require("./routes/userRoute")
app.use('/api',userRoute)


const adminRoute=require("./routes/adminRoute")
app.use('/api',adminRoute)


const studentRoute=require("./routes/studentRoute")
app.use('/api',studentRoute)
app.listen(8000,()=>{
    console.log("server is runing... on port 8000")
})






