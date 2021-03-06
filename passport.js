"use strict"
var _ = require('lodash');
var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;

var secret = require('./secret');
var User = require('./models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Sign in using Username and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
  username = username.toLowerCase();
  User.findOne({ username: username }, function(err, user) {
    if (!user) return done(null, false, { message: 'Username ' + username + ' not found'});
    if( user.comparePassword(password) ){
      return done(null, user)
    }else{
      return done(null, false, { message: 'Invalid username or password.' });
    }
  });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};

module.exports = passport