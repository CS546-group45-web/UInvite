const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const users = require('../data/users');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(opts, (payload, next) => {
  users.getUserById(payload.id).then((user) => {
    console.log(user);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

module.exports = strategy;
