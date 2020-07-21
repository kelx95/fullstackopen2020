const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '8a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    __v: 0
  },
  {
    _id: '9a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 120,
    __v: 0
  },
  {
    _id: '0a422aa71b54a676234d17f8',
    title: 'Cloud..',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 55,
    __v: 0
  },
  {
    _id: '2a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '1a422aa71b54a676234d17f8',
    title: 'New blog new',
    author: 'Kelment Xhelili',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '4a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '6a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  const allBlogs = blogs.map(blog => blog.toJSON())
  return allBlogs
}

// Blog.find({}).then(blog => {
//   console.log('operation returned the following blogs', blog)
// })
// console.log('blogss..')
// const result = blogsInDb()
// console.log(result)

module.exports = {
  initialBlogs, blogsInDb
}