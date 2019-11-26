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

test('Given post data when create post should create a new post', async () => {
  await request(app)
    .post('/posts')
    .set('Authorization', `Bearer ${userZero.tokens[0].token}`)
    .attach('photo', 'tests/fixtures/kucing.jpg')
    .send(postZero)
    .expect(201)
})
