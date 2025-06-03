const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN"]
  }
});

module.exports = mongoose.model('User', userSchema);