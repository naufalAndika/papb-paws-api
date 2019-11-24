const request = require('supertest')
const app = require('../src/app')
const { setupDatabase } = require('./fixtures/db')
const User = require('../src/models/user')

const userOne = {
  name: 'Naufal Andika',
  email: 'andikaa@example.com',
  username: 'naufalandika',
  password: 'nopalnopal'
}

beforeEach(setupDatabase)

test('Given user data when create user should save in database', async () => {
  const response = await request(app)
    .post('/users')
    .send(userOne)
    .expect(201)

  const user = await User.findById(response.body._id)
  expect(user).not.toBeNull()
})
