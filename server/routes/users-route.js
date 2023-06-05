const express = require("express");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const usersData = require("../models/users-model.js");

const router = express.Router();

router.use(express.json());
router.use(cors());

//login user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  usersData
    .findOne({ email })
    .then(async (existingUser) => {
      if (existingUser) {
        //comparing encoded passwords
        let isValidPassword;
        isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
          return res.status(500).json({ message: "User not found" });
        } else {
          const token = jwt.sign(
            { userID: existingUser.id, email: existingUser.email },
            "mysecrettobescret",
            { expiresIn: "1h" }
          );

          return res.status(200).json({
            message: "Login Successful",
            email: existingUser.email,
            fullName: existingUser.fullName,
            token,
          });
        }
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    })
    .catch((e) => {
      return res.status(500).send({ message: "Internal Error" });
    });
});

//signup new user

router.post("/createNewUser", async (req, res) => {
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
});

module.exports = router;
