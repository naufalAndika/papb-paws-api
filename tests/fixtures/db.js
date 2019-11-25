const User = require('../../src/models/user')
const Shelter = require ('../../src/models/shelter')
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

const shelterZeroId = new mongoose.Types.ObjectId()
const shelterZero = {
  _id: shelterZeroId,
  name: 'Penitipan Kucing Dhaffa',
  owner: userZeroId,
  location: {
    lat: -7.953344,
    long: 112.613519
  }
}

const shelterOneId = new mongoose.Types.ObjectId()
const shelterOne = {
  _id: shelterOneId,
  name: 'Penitipan Kucing FTP',
  owner: userZeroId,
  location: {
    lat: -7.952781,
    long: 112.615176
  }
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Shelter.deleteMany()
  await new User(userZero).save()
  await new Shelter(shelterZero).save()
}

module.exports = {
  setupDatabase,
  userOne,
  userZero,
  userZeroId,
  shelterZeroId,
  shelterZero,
  shelterOneId,
  shelterOne
}
