const request = require('supertest')
const app = require('../src/app')
const { userZero, userOne, setupDatabase } = require('./fixtures/db')
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

test('Given user with taken email when create user should not registered', async () => {
  const response = await request(app)
    .post('/users')
    .send(userZero)
    .expect(400)
})

test('Given credentials when login should return token', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      username: userZero.username,
      password: userZero.password
    })
    .expect(200)

  const user = await User.findById(response.body.user._id)
  expect(user.tokens.length).toBe(1)
})

test('Given invalid credentials when login should not return token', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: 'username',
      password: 'password'
    })
    .expect(400)
})
