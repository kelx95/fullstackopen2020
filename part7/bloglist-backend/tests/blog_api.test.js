const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

//wraps the express application with the supertest function into so called superagent object
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
let loggedInToken = ''

beforeEach(async () => {
  await User.deleteMany({})
  //create all users
  for (let user of helper.initialUsers) {
    await api
      .post('/api/users')
      .send(user)
  }
  //login with kelmentxhelili
  const login = await api.post('/api/login')
    .send(helper.loginUser)
  loggedInToken = login.body.token

  await Blog.deleteMany({})
  //all blogs will be created by user: kelmentxhelili
  for (let blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedInToken}`)
      .send(blog)
  }
})

test('blogs are returned as json', async () => {
  const response =
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0].id)
  expect(response.body[0].id).toBeDefined()
})

test('making an HTTP POST request to the /api/blogs url successfully', async () => {
  //create a new blog
  const newBlog = {
    title: 'Hello Test test Blog',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  }
  //post the new blog with the header 'authorization' and token
  const postBlog = await api.post('/api/blogs')
    .send(newBlog)
    .set('Accept', 'application/json')
    .set('Authorization', `bearer ${loggedInToken}`)
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
    .set('Authorization', `bearer ${loggedInToken}`)
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
    .set('Authorization', `bearer ${loggedInToken}`)
    .expect(400)
})

test('remove by id', async () => {
  const getBlogsFromDB = await helper.blogsInDb()
  console.log(getBlogsFromDB)
  //delete first blog from db
  const id = getBlogsFromDB[0].id
  console.log(id)
  await api.delete(`/api/blogs/${id}`)
    .set('Authorization', `bearer ${loggedInToken}`)
    .expect(204)
})

test('update by id', async () => {
  const getBlogsFromDB = await helper.blogsInDb()

  const id = getBlogsFromDB[1].id

  const update = {
    title: 'from test update by id',
    author: 'test author',
    url: 'no url'
  }
  const updatedObject = await api.put(`/api/blogs/${id}`)
    .send(update)
    .set('Authorization', `bearer ${loggedInToken}`)
    .expect(200)

  const { title, author, url } = updatedObject.body

  const receivedObject = {
    title,
    author,
    url
  }
  expect(JSON.stringify(receivedObject)).toBe(JSON.stringify(update))
})

//once all the test have finished running we have to close the database connection used by Mongoose
afterAll(() => {
  mongoose.connection.close()
})