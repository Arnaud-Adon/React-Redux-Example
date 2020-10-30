const passport = require("passport");
const User = require("../../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStartegy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

passport.use(
  new JwtStrategy(options, function (payload, done) {
    User.findOne({ _id: payload.sub }, function (err, user) {
      // This flow look familiar?  It is the same as when we implemented
      // the `passport-local` strategy

      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

const localOptions = {
  usernameField: "email",
};

passport.use(
  new LocalStartegy(localOptions, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      user.isPasswordEqualTo(password, function (err, same) {
        if (err) return done(err);
        if (!same) return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      });
    });
  })
);
