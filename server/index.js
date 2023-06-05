const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");

const usersAPI = require("./routes/users-route");
const app = express();
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://consciousearth:consciousearth@cluster0.9thgxyd.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("Conscious Guide Server is up and running");
});

app.use("/api", usersAPI);

app.listen(5000, () => {
  console.log("Server is running");
});
