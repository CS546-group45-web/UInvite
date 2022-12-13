const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const users = require("../data/users");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(opts, (payload, done) => {
  users.getUserById(payload.id).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

module.exports = strategy;
