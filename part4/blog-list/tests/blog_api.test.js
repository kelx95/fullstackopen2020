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
  const postBlog = await api.post('/api/blogs')
    .send(newBlog)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
  //destruct the returned object from post
  const { title, author, url, likes } = postBlog.body
  expect(JSON.stringify({ title, author, url, likes })).toBe(JSON.stringify(newBlog))
})

test('verify if the likes property is missing will default to zero', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  }
  const postBlog = await api.post('/api/blogs')
    .send(newBlog)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  expect(postBlog.body.likes).toBe(0)
})

test('title and url are required', async () => {
  await api.post('/api/blogs')
    .send({
      author: 'Edsger W. Dijkstra',
      likes: 1
    })
    .set('Accept', 'application/json')
    .expect(400)
})

test('remove by id', async () => {
  //first blog
  const id = helper.initialBlogs[0]._id

  await api.delete(`/api/blogs/${id}`)
    .expect(204)

})

test('update by id', async () => {
  const id = helper.initialBlogs[0]._id
  //console.log(helper.initialBlogs[0])
  const updateResource = await api.put(`/api/blogs/${id}`)
    .send({
      title: 'from test',
      author: 'test author',
      url: 'no url'
    })
    .set('Accept', 'application/json')
    .expect(200)
  console.log(updateResource.body)
})
//once all the test have finished running we have to close the database connection used by Mongoose
afterAll(() => {
  mongoose.connection.close()
})