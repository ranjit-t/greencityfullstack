const mongoose = require("mongoose");

const userSignUpSchema = mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true, // `email` must be unique
  },
  password: String,
});

const usersData = mongoose.model("usersData", userSignUpSchema);

module.exports = usersData;
