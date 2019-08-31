var mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var fs = require('fs');

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index:true,
    unique: true,
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String
  },
  name: {
    type: String
  },
  profile: {
      type: String
  },
  img: { 
      data: Buffer, 
      contentType: String 
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
  }
  module.exports.getUsers = function(callback){

    User.find(callback);
  }
  module.exports.updateUserById = function(idUser,data, callback){
    User.updateOne({ _id: idUser }, data, { new: true },callback)
    
  }
  

  module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
    });
  }
