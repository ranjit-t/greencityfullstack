//Models
const usersData = require("../models/users-model.js");

//Required
const bcrypt = require("bcryptjs");

const createNewUserController = async (req, res) => {
  const { fullName, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
  const newUser = new usersData({ fullName, email, password: hashedPassword });

  const existingUser = await usersData.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ error: "duplicate" });
  }

  newUser
    .save()
    .then((savedData) => {
      return res.status(201).json(savedData);
    })
    .catch((e) => {
      return res.status(500).json({ error: e });
    });
};

module.exports = createNewUserController;
