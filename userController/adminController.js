const User = require("../Modals/userModal");
const bcrypt = require("bcrypt");

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);
        const userData = await User.findOne({ email: email });
        if (userData) {
          const passwordMatch = await bcrypt.compare(password, userData.password);
          if (passwordMatch) {
            if (userData.is_admin === 0) {
              res.status(201).send({ message: " password is incorrect" });
            } else {
             res.status(200).send({message:"Admin login successfully",userData})
            }
          } else {
            res.status(201).send({
              message: "Your email and password is incorrect",
            });
          }
        } else {
          res.status(201).send({ message: "Your email and password is incorrect" });
        }
      } catch (error) {
        console.log(error);
      }
};
module.exports = {
    verifyLogin
};
