const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a Valid Email',
    },
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 8,
          minSymbols: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
        });
      },
      message:
        'Password must Contain 1 Special Character , 1 Uppercase , 1 Lowercase ',
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
  },
   isActive : {
    type :Boolean,
    default : true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
