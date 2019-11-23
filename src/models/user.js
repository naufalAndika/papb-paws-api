const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new BadRequest('Email is invalid!')
      }
    }
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  location: {
    lat: {
      type: String
    },
    long: {
      type: String
    }
  },
  tokens: [{
    token: {
      type: String
    }
  }]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
