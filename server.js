const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// routes
const userRouter = require("./routes/users");
app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/mernauth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Successfully connected to Database");
  }
);

// change route to plural as this is a common naming convention
// great to use with consistency
// mounting route
app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Express server started");
});
