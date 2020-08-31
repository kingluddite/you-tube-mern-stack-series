const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

// this is "pre" hook in mongoose
// using old function because we need access to `this`
// We run this before we save the user
// next says once done execute next function
UserSchema.pre("save", function (next) {
  // do we need the hash?
  // if our password has been modified there is no need to hash the password
  // we only want to hash the password if it is plain text
  // a new user - the password is in plain text
  //  or an existing user who wants to change their password
  if (!this.isModified("password")) {
    return next();
  }

  // 10 is salt (how strong you want the encryption to be - 10 is recommended)
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    // we have our hashed password and now we need to override our
    // existing password with the new hashed password
    this.password = passwordHash;
    // call next to say we are done
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  // we need a way to compare the plain text version of our password that we
  // received from the client (aka React) to the hashed version of our password
  // that is our Database
  // bcryptjs has a compare function we can use to do this
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        // this gets executed if the password they used does not match pwd in Database
        return cb(null, isMatch);
      }
      // null is the error
      // this is the user
      // this will end up attaching the user object to the req object
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
