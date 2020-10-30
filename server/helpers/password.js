const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = (user, next) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
};

exports.comparePassword = (password, userPassword, done) => {
  bcrypt.compare(password, userPassword, (err, same) => {
    if (err) {
      return done(err);
    }
    return done(null, same);
  });
};
