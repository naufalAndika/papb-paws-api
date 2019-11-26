const app = require('../src/app')
const request = require('supertest')
const Post = require('../src/models/post')
const { setupDatabase, userZero } = require('./fixtures/db')

const postZero = {
  desc: 'Kucing ini ditemukan di depan toko kue. Berwarna hijau army, sehat, manja, dan suka makan.',
  sex: 0,
  foundAt: {
    lat: -7.955820,
    long: 112.615991
  }
}

beforeEach(setupDatabase)

test('Given unauthorized user when create post should return unauthorized', async () => {
  await request(app)
    .post('/posts')
    .field('desc', postZero.desc)
    .field('sex', postZero.sex)
    .field('foundAt', JSON.stringify(postZero.foundAt))
    .attach('photo', 'tests/fixtures/kucing.jpg')
    .expect(401)
})

test('Given post data when create post should create a new post', async () => {
  await request(app)
    .post('/posts')
    .set('Authorization', `Bearer ${userZero.tokens[0].token}`)
    .field('desc', postZero.desc)
    .field('sex', postZero.sex)
    .field('foundAt', JSON.stringify(postZero.foundAt))
    .attach('photo', 'tests/fixtures/kucing.jpg')
    .expect(201)
})
