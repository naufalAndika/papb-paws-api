const User = require('../../src/models/user')

const userZero = {
  name: 'Dhaffa',
  email: 'dhaffa@example.com',
  username: 'dhaffa',
  password: 'dhaffa'
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
  userOne
}
