const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  //get the user
  const user = await User.findById(body.user)
  console.log('user found with user.findbyid', user)
  //reference the user with user._id
  const blog = new Blog({
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })
  //save blog
  const savedBlog = await blog.save()
  //add the savedBlog id to the user collection
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  console.log('user after saved', user)

  if (savedBlog) return response.status(201).json(savedBlog)
  return response.status(400)
})

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const objectRemove = await Blog.findByIdAndRemove(id)
  if (objectRemove) response.status(204).json(objectRemove)
  response.status(400)
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const oldObject = await Blog.findById(id)
  //console.log('old object', oldObject)

  const updatedObject = {
    title: request.body.title || oldObject.title,
    author: request.body.author || oldObject.author,
    url: request.body.url || oldObject.url,
    likes: request.body.likes || oldObject.likes
  }
  const objectToUpdate = await Blog.findByIdAndUpdate(id, updatedObject, { new: true })
  //console.log(objectToUpdate)
  if (objectToUpdate) response.status(200).json(objectToUpdate)
  response.status(400)
})

module.exports = blogRouter