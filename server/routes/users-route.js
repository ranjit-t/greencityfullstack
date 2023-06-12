const express = require("express");
// var bcrypt = require("bcryptjs");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

//Models
// const usersData = require("../models/users-model.js");

//Controllers
const usersLoginController = require("../controllers/login-controller.js");
const createNewUserController = require("../controllers/createNewUser-controller.js");
const router = express.Router();

router.use(express.json());
router.use(cors());

//login user
router.post("/login", usersLoginController);

//signup new user

router.post("/createNewUser", createNewUserController);

module.exports = router;
