const User = require("../Modals/userModal");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const keysecret = "SECRET_KEY";
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vikesh.667kumar@gmail.com",
    pass: "zdatdkbtpablrjeq",
  },
});
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
    const userData = await user.save();
    if (userData) {
      sendVerifyMail(req.body.name, req.body.email, userData._id);
      res.status(200).send({
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
const sendPasswordLink = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).send({ message: "please enter your email" });
  }
  try {
    const userFind = await User.findOne({ email: email });
    
    const token = jwt.sign({ _id: userFind._id }, keysecret, {
      expiresIn: "120s",
    });
    const setuserToken = await User.findByIdAndUpdate(
      { _id: userFind._id },
      { is_varified: token },
      { new: true }
    );
    if (setuserToken) {
      const mailOption = {
        from: "vikesh.667kumar@gmail.com",
        to: email,
        subject: "Sending Email for password Reset",
        text: `This link valid for 2 Minutes http://localhost:3000/forgotPassword/${userFind.id}/${setuserToken.is_varified}`,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).send({ message: "email" });
        } else {
          res.status(201).send({ message: "email send successfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).send({ message: "invalid user" });
  }
};
const forgotPassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await User.findOne({ _id: id, is_varified: token });
    const is_varified = jwt.verify(token, keysecret);
      
    if (validuser && is_varified._id) {
      res.status(201).send({ validuser });
    } else {
      res.status(401).send({ message: "User nod exist's" });
    }
  } catch (error) {
    res.status(401).send({ message: "User nod exist's" });
  }
};
const setPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(token);

  try {
    const validuser = await User.findOne({ _id: id, is_varified: token });
    const is_varified = jwt.verify(token, keysecret);
        
    if (validuser && is_varified._id) {
      const newPassword = await bcrypt.hash(password, 10);
      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: id },
        { password: newPassword }
      );
      console.log(setnewuserpass);
      await setnewuserpass.save();

      res
        .status(200)
        .send({ message: "password updated successfully", setnewuserpass });
    } else {
      res.status(401).send({ message: "User nod exist's" });
    }
  } catch (error) {
    res.status(401).send({ message: "hiii" });
  }
};
module.exports = {
  register,
  loginUser,
  sendPasswordLink,
  forgotPassword,
  setPassword,
};
