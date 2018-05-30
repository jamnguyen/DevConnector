const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtractor = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('./keys');

// Strategy options
const options = {};
options.jwtFromRequest = JwtExtractor.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.jwtSecretKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (payload, done) => {
    User
      .findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => console.log(err));
  }));
}