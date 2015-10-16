const mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  role: {type: String, required: false},
  created_at: {type: Date, default: Date.now }
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema)