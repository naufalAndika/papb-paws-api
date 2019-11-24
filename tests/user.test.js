const request = require('supertest')
const app = require('../src/app')
const { setupDatabase } = require('./fixtures/db')

const userOne = {
  name: 'Naufal Andika',
  email: 'andikaa@example.com',
  username: 'naufalandika',
  password: 'nopalnopal'
}

beforeEach(setupDatabase)

test('Given user data should sign up user', async () => {
  await request(app)
    .post('/users')
    .send(userOne)
    .expect(201)
})
