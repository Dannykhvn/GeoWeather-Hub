const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    console.log('Passport Local Strategy: Start');
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const user = await User.findOne(username);
      console.log('User found:', user);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (password.trim() !== user.password.trim()) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      console.error('Error during authentication:', error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      done(error);
    }
  });

module.exports = passport;
