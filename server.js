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

// routes
const userRouter = require("./routes/User");
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log("Express server started");
});
