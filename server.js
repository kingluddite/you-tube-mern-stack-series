const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cookieParser());
app.unsubscribe(express.json());

mongoose.connect(
  "mongodb://localhost:27017/mernauth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Successfully connected to Database");
  }
);

// hack way to test if our User model is working
const User = require("./models/User");

// create a test user
const userInput = {
  username: "test@example.com",
  password: "a123456",
  role: "admin",
};

const user = new User(userInput);
// data (but in mongodb it is called a document);
user.save((err, document) => {
  if (err) {
    console.log(err);
  } else {
    console.log(document);
  }
});

app.listen(5000, () => {
  console.log("Express server started");
});
