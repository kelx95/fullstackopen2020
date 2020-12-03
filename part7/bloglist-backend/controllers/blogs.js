const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  //const blogs = await Blog.find({}).populate('comments', { content: 1, blog: 1 })
  return response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //console.log('token undecoded', decodedToken)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
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
  if (savedBlog) return response.status(201).json(savedBlog)
  return response.status(400)
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  console.log('/:id/comments route here')
  const body = request.body
  console.log(body)
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //console.log('token undecoded', decodedToken)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogFound = await Blog.findById(request.params.id)
  console.log('Blog Found', blogFound)
  blogFound.comments.push({ content: body.content })
  //save blog
  const savedBlog = await blogFound.save()
  if (savedBlog) return response.status(201).json(savedBlog)
  return response.status(400)
})

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  console.log('delete id', id)
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('decodedtoken', decodedToken)
  //find the object with the id from the parameter id
  const findObject = await Blog.findById(id)
  console.log('blog found', findObject)
  console.log(findObject)
  //check if the id of the user loged in is the same with the blog users id
  //if the same remove that blog
  if (findObject.user.toString() === decodedToken.id.toString()) {
    const deleted = await Blog.findByIdAndDelete(id)
    response.status(204).json(deleted)
  } else {
    response.status(401).send({ error: 'Unauthorized if token is not provided' })
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const findObject = await Blog.findById(id)
  if (findObject.user.toString() === decodedToken.id.toString()) {
    const updatedObject = {
      title: request.body.title || findObject.title,
      author: request.body.author || findObject.author,
      url: request.body.url || findObject.url,
      likes: request.body.likes || findObject.likes
    }
    const objectToUpdate = await Blog.findByIdAndUpdate(id, updatedObject, { new: true })
    response.status(200).json(objectToUpdate)
  } else {
    response.status(401).send({ error: 'Unauthorized if token is not provided' })
  }
})

module.exports = blogRouter