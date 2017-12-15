/**
 * PassportService
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(username, password, done) {
        User.findOne({email : username}).then(function(user){
            if(!user){
                return done(null, false, "user not found");
            }

            if(bcrypt.compare(user.password, password)){
                return done(null, user);
            }
            return done(null, false, "Invalid username or password");
        })
      }
    ));

