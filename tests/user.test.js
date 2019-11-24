const request = require('supertest')
const app = require('../src/app')
const { userOne, setupDatabase } = require('./fixtures/db')
const User = require('../src/models/user')


beforeEach(setupDatabase)

test('Given user data when create user should save in database', async () => {
  const response = await request(app)
    .post('/users')
    .send(userOne)
    .expect(201)

  const user = await User.findById(response.body._id)
  expect(user).not.toBeNull()
})

test('Given user data when create user should not save plain password', async () => {
  const response = await request(app)
    .post('/users')
    .send(userOne)
    .expect(201)

  const user = await User.findById(response.body._id)
  expect(user.password).not.toEqual(userOne.password)
})
