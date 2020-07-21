const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

//wraps the express application with the supertest function into so called superagent object
const api = supertest(app)
const Blog = require('../models/blog')
const { response } = require('express')

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
  console.log(response.body)
})

test('unique identifier id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0].id)
  expect(response.body[0].id).toBeDefined()
})

test('making an HTTP POST request to the /api/blogs url successfully', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  }
  const blogToSend = new Blog(newBlog)
  const postBlog = await api.post('/api/blogs')
    .send(blogToSend)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  //destruct the returned object from post
  const { title, author, url, likes } = postBlog.body
  expect(JSON.stringify({ title, author, url, likes })).toBe(JSON.stringify(newBlog))

})

//once all the test have finished running we have to close the database connection used by Mongoose
afterAll(() => {
  mongoose.connection.close()
})