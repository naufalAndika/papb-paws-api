const User = require('../../src/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userZeroId = new mongoose.Types.ObjectId()
const userZero = {
  _id: userZeroId,
  name: 'Dhaffa',
  email: 'dhaffa@example.com',
  username: 'dhaffa',
  password: 'dhaffa',
  tokens: [{ token: jwt.sign({ _id: userZeroId }, process.env.JWT_SECRET) }]
}

const userOne = {
  name: 'Naufal Andika',
  email: 'andikaa@example.com',
  username: 'naufalandika',
  password: 'nopalnopal'
}

const setupDatabase = async () => {
  await User.deleteMany()
  await new User(userZero).save()
}

module.exports = {
  setupDatabase,
  userOne,
  userZero,
  userZeroId
}
