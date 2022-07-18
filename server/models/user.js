const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// user Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address',
    },
  },
  dateOfBirth: {
    type: Date,
    default: Date.now(),
  },
  mobile: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: String,
    default: 'student',
  },
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, type: this.accountType },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFE_TIME,
    }
  );
};

module.exports = mongoose.model('User', userSchema);
