const User = require('../../src/models/user')
const Shelter = require ('../../src/models/shelter')
const Post = require('../../src/models/post')
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
  location: {
    lat: -7.952781,
    long: 112.615176
  }
}

const postZero = {
  desc: 'Kucing ini ditemukan di depan toko kue. Berwarna hijau army, sehat, manja, dan suka makan.',
  sex: 0,
  foundAt: {
    lat: -7.955820,
    long: 112.615991
  }
}

const postOneId = new mongoose.Types.ObjectId()
const postOne = {
  _id: postOneId,
  desc: 'Kucing ini ditemukan di depan toko rambutan. Berwarna hitam putih, sehat, manja, dan suka makan.',
  sex: 0,
  foundAt: {
    lat: -7.956720,
    long: 112.625091
  }
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Shelter.deleteMany()
  await Post.deleteMany()
  await new User(userZero).save()
  await new Shelter(shelterZero).save()
  await new Post(postOne).save()
}

module.exports = {
  setupDatabase,
  userOne,
  userZero,
  userZeroId,
  shelterZeroId,
  shelterZero,
  shelterOneId,
  shelterOne,
  postZero,
  postOne,
  postOneId
}
