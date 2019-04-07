const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

// Generate Password
//const saltRounds = 10

//const salt = bcrypt.genSaltSync(saltRounds)
//const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)
var User = require('../users/user')

// function findUser (username, callback) {
//   if (username === User.username) {
//     return callback(null, user)
//   }
//   return callback(null)
// }

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });
 

function initPassport () {
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
              return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
              if(err) throw err;
               if(isMatch){
                 return done(null, user);
               } else {
                 return done(null, false, {message: 'Invalid password'});
               }
           });
         });
        }
      ));

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport