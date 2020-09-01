const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");

// test out our login
const signToken = (userId) => {
  // jwt.sign() will return the actual jwt
  // first parameter to jwt.sign is payload
  return jwt.sign(
    {
      // issuer - who issued this jwt token
      iss: "NoobCoder",
      // subject - who is this jwt token for?
      sub: userId, // this is the primary key of the user
      // note - in your payload you can send back whatever you want!
      // (but never send back any sensative data like a SS# or Credit Card Number)
    },
    // the second parameter is the key that you want to sign with
    // We set this to "NoobCoder" - this is important because when you sign you are creating this jwt token (this must mast the "secretOrKey" you set in passport.js - and this is sensative data so it must be stored in your environment variables and never on github (as it is essentially a password))
    // to sign passport needs secretOrKey to match with
    // tip: copy and paste to make sure they are both identical
    "NoobCoder",
    // when do you want your token to expire?
    { expiresIn: "1h" } // 1 day or 5000 (5000 is ms)
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  // the cb is an error paramater and user
  // we get the user if we find one based on username
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "Error has occurred", msgError: true } });
    }
    if (user) {
      res.status(400).json({
        message: { msgBody: "Username already taken", msgError: true },
      });
    } else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        } else {
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
        }
      });
    }

    // make sure username doesn't exist
  });
});

// we need to use our Passport middleware here
userRouter.post(
  "/login",
  // first parem "local" is our Strategy to authenticate
  // session: false (this means the server is not maintaining the session)
  // this is using our LocalStrategy we created in passport.js
  passport.authenticate("local", { session: false }),
  (req, res) => {
    // Passport gives us true if we are authenticated
    // if we are authenticated our model will use the comparePassword method on User model and if our password matches the encrypted password in our Database, we get back the user object `return cb(null, this)
    // false if we are not authenticated
    // ---> this means Passport is attaching that user object to the request object
    if (req.isAuthenticated()) {
      // see long note about to get explanation of how we get access to the user object on the request object
      const { _id, username, role } = req.user;
      // we need to create the signToken function
      const token = signToken(_id);
      // we will set our token in the cookie with security settings
      // see README for explanation of httpOnly and sameSite
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      // send back to client success 200
      // and isAuthenticated is true and we give the client the username and role (but not password)
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

// we need to use our Passport middleware here
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "", success: true } });
  }
);

// we need to use our Passport middleware here
userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "Error has occurred", msgError: true } });
      } else {
        // add the todo to the todos array within the user (see User model)
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err) {
            res.status(500).json({
              message: { msgBody: "Error has occurred", msgError: true },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully created Todo",
                msgError: false,
              },
            });
          }
        });
      }
    });
  }
);

// we need to use our Passport middleware here
userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((err, document) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "Error has occurred", msgError: true },
          });
        } else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res.status(403).json({
        message: { msgBody: "You're not an admin,go away", msgError: true },
      });
  }
);

// working with react we save in the state that we are logged in
// but once you close the browser the state gets reset
// this endpoint makes sure the backend and frontend are synced
// So even if a user closes the browser and opens again you'll still be logged in if he was authenticated
// this will only be used for persistence to work with our front end
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = userRouter;
