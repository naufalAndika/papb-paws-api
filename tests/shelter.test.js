const request = require('supertest')
const app = require('../src/app')
const Shelter = require('../src/models/shelter')
const { shelterZero, shelterZeroId, shelterOne, shelterOneId, userZeroId, userZero, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Given shelter data when create shelter should create new shelter', async () => {
  await request(app)
    .post('/shelters')
    .set('Authorization', `Bearer ${userZero.tokens[0].token}`)
    .send(shelterOne)
    .expect(201)

  const shelter = await Shelter.findById(shelterOneId)
  expect(shelter).not.toBeNull()
})
