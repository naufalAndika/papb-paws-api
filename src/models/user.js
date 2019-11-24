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

userSchema.statics.findByUsername = async (username) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Unable to login!')
  }

  return user
}

userSchema.methods.matchPassword = async function (password) {
  const user = this
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login!')
  }

  return user
}

userSchema.methods.generateToken = async function () {
  const user = this
  return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
}

userSchema.methods.addToken = async function (token) {
  const user = this
  user.tokens = user.tokens.concat({ token })
  await user.save()
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
