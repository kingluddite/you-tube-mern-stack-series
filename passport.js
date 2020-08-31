// passport is our authentication middleware
const passport = require("passport");
// local strategy is how we are going to be authenticating against
//  and we are just using a username and password against a mongoDB
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
// we are going to be authenticating against our User model
const User = require("./models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization
// (used wherever we want to protect a resource)
// (we want to protect our todos endpoint)
// (and we want to protect our admin panel)
// use use authorization to protect private pages (you are protecting their endpoints)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "NoobCoder",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// authenticated local strategy using username and password
// (will only be used when we log in)
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // something went wrong with Database
      if (err) {
        return done(err);
      }
      // what if there is no user?
      // if there is no user then the client is trying to sign into an account that
      //  doesn't exist
      if (!user) {
        // there is no error but we did not find a user
        return done(null, false);
      }

      // we have a user
      // We get this function from bcryptjs
      // and we are comparing the password from the client to the hashed password in our Database
      user.comparePassword(password, done);
    });
  })
);
