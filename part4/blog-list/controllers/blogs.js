const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// blogRouter.get('/', (request, response) => {
//   Blog.find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })
//Refactor to use async - await syntax
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})


// blogRouter.post('/', (request, response, next) => {
//   const blog = new Blog(request.body)

//   blog.save()
//     .then(savedBlog => {
//       response.json(savedBlog)
//     })
//     .catch(error => next(error))
// })

//Refactor code to use async-await
blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

module.exports = blogRouter