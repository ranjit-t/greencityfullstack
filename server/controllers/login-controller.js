//Models
const usersData = require("../models/users-model.js");

//Required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await usersData.findOne({ email });
    if (existingUser) {
      //comparing encoded passwords
      let isValidPassword;
      isValidPassword = await bcrypt.compare(password, existingUser.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Check password" });
      } else {
        const token = jwt.sign(
          { userID: existingUser.id, email: existingUser.email },
          "mysecrettobescret",
          { expiresIn: "1h" }
        );
        return res.status(201).json({ message: "Logged in", token });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    return res.status(500).send({ message: "Internal Error" });
  }
};

module.exports = usersLoginController;
