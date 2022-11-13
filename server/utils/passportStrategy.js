const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const users = require('../data/users');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(opts, (payload, done) => {
  console.log('payload received', payload);
  users.getUserById(payload.id).then((user) => {
    console.log(user);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

module.exports = strategy;
