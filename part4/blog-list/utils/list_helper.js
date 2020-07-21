const _ = require('lodash')
const { groupBy } = require('lodash')

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    if (blogs.length > 0) return blogs.length
    return 1
  }
}
const blogsDummy = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'GHafhaho To Statement Considered Harmful',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 150,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'hala hala',
    author: 'Kelment',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 17,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go gog ogogogos To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 110,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0
  }
]

const totalLikes = (blogs) => {
  let countLikes = 0
  for (let blog of blogs) {
    countLikes += parseInt(blog.likes, 10)
  }
  return countLikes
}

const favoriteBlog = (blogs) => {
  const { title, author, likes } = blogs.sort((a, b) => b.likes - a.likes)[0]

  return {
    title,
    author,
    likes
  }
}

const mostBlogs = (blogs) => {
  const authorBlogs = _.countBy(blogs, 'author')

  let result = Object.entries(authorBlogs).map(([key, value]) => ({
    author: key,
    blogs: value
  }))

  let maxBlogs = _.maxBy(result, author => author.blogs)
  return maxBlogs
}

const mostLikes = (blogs) => {
  //to find the most like of one of the post
  // const maxLikes = _.maxBy(blogs, blog => blog.likes)
  // const { author, likes } = maxLikes
  // return { author, likes }

  const groupByAuthor = _.groupBy(blogs, 'author')
  //console.log(groupByAuthor)
  //find the total likes of all posts of an author
  const authorsWithLikes = _.map(groupByAuthor, (arrayOfBlogs, author) => {
    let count = 0
    _.forEach(arrayOfBlogs, (blogObject) => {
      count += blogObject.likes
    })
    //console.log(author, count)
    return { author: author, 'likes': count }
  })

  return _.maxBy(authorsWithLikes, 'likes')
}

console.log(mostLikes(blogsDummy))

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}