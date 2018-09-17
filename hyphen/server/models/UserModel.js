const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  },
  active: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

