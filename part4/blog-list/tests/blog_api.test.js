const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

//wraps the express application with the supertest function into so called superagent object
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  //console.log('cleared')
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
    //console.log('saved')
  }
  //console.log('done')
})

test('blogs are returned as json', async () => {
  const response =
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  // console.log(response.body)
})

//once all the test have finished running we have to close the database connection used by Mongoose
afterAll(() => {
  mongoose.connection.close()
})