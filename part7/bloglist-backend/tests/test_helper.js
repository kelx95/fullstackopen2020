const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Will get deleted',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15
  },
  {
    title: 'Cloud..',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 55
  },
  {
    title: 'Javascript',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 120
  },
  {
    title: 'MongoDB',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  },
  {
    title: 'NewBlog',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  },
  {
    title: 'NodeJS',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  },
  {
    title: 'Newwww',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  },
]

const initialUsers = [
  {
    username: 'kelmentxhelili',
    password: '123456',
    name: 'kelment',
    blogs: []
  },
  {
    username: 'mendixhelili',
    password: '123456',
    name: 'mendi',
    blogs: []
  }
]

const loginUser = {
  username: 'kelmentxhelili',
  password: '123456'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  const allBlogs = blogs.map(blog => blog.toJSON())
  return allBlogs
}

const usersInDb = async () => {
  const users = await User.find({})
  const allUsers = users.map(user => user.toJSON())
  return allUsers
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb, loginUser
}