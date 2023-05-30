const User = require("../Modals/userModal");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const sendVerifyMail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "vikesh.667kumar@gmail.com",
        pass:"zdatdkbtpablrjeq" ,
      },
    });
    const mailOption = {
      from: "vikesh.667kumar@gmail.com",
      to: email,
      subject: "For Verification mail",
      html:
        "<p>Hi " +
        name +
        ' ,please click here to <a href="http://localhost:8000/verify?id=' +
        user_id +
        '">verify</a>your mail  ',
    };
    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("eamil has been sent:-", info.exports);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const spassword = await securePassword(req.body.password);
  const userData = await User.findOne({ email });
  if (userData) {
    res.status(200).send({ message: "This email is already exist" });
  } else {
    const user = new User({
      name,
      email,
      mobile,
      password: spassword,
      image: req.file.filename,
      is_admin: 0,
    });
  const userData=await  user.save();
  if(userData){
    sendVerifyMail(req.body.name, req.body.email, userData._id);
    res
      .status(200)
      .send({
        message: "your registration is successful please verify your mail",
        user,
      });
  }
   
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        res
          .status(200)
          .send({ message: "User loged in successfully", userData });
      } else {
        res.status(200).send({ message: "your password is invalid" });
      }
    } else {
      res.status(200).send({ message: "Your email dosen't exist" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const verifyMail = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_varified: 1 } }
    );
    console.log(updateInfo);
    return res.render("verified",{message:"mail has verified"});
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  register,
  loginUser,
  verifyMail
};
