const app = require('../src/app')
const request = require('supertest')
const { setupDatabase, userZero, userZeroId, postZero, postOneId, shelterZeroId } = require('./fixtures/db')

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

test('Given post data when create post should create a new post with user owner', async () => {
  const response = await request(app)
    .post('/posts')
    .set('Authorization', `Bearer ${userZero.tokens[0].token}`)
    .field('desc', postZero.desc)
    .field('sex', postZero.sex)
    .field('foundAt', JSON.stringify(postZero.foundAt))
    .attach('photo', 'tests/fixtures/kucing.jpg')
    .expect(201)

  expect(response.body.owner._id).toEqual(userZeroId.toString())
})

test('Given json foundAt object when create data should become js object in post', async () => {
  const response = await request(app)
    .post('/posts')
    .set('Authorization', `Bearer ${userZero.tokens[0].token}`)
    .field('desc', postZero.desc)
    .field('sex', postZero.sex)
    .field('foundAt', JSON.stringify(postZero.foundAt))
    .attach('photo', 'tests/fixtures/kucing.jpg')
    .expect(201)

  expect(response.body.foundAt).toEqual(postZero.foundAt)
})

test('Given id when get post detail should return post detail', async () => {
  const response = await request(app)
    .get(`/posts/${postOneId}`)
    .send()
    .expect(200)  

  expect(response.body._id).toEqual(postOneId.toString())
})

test('Given invalid id when get post detail should return not found', async () => {
  await request(app)
    .get('/posts/5ddb2b31dc82781948c120b1')
    .send()
    .expect(404)  
})

test('Should return post list', async () => {
  const response = await request(app)
    .get('/posts')
    .send()
    .expect(200)

  expect(response.body.length).toEqual(1)
})

test('Should adopt post', async () => {
  const response = await request(app)
    .post(`/posts/${postOneId}/adopt`)
    .send()
    .expect(200)

  expect(response.body.adopted).toEqual(true)
})

test('Given invalid id when adopt should return not found', async () => {
  await request(app)
    .post('/posts/5ddb2b31dc82781948c120b1/adopt')
    .send()
    .expect(404)
})

test('Given shelter id should set post location', async () => {
  const response = await request(app)
    .patch(`/posts/${postOneId}`)
    .set('Authorization', `Bearer ${userZero.tokens[0].token}`)
    .send({
      location: shelterZeroId 
    })
    .expect(200)

  expect(response.body.location).toEqual(shelterZeroId.toString())
})
