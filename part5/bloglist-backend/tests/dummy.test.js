const listHelper = require('../utils/list_helper')

//first one
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogsDummy = [
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

//total likes
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

//favoriteBlog
describe('favorite blog', () => {
  test('the blog who has most likes', () => {
    const result = listHelper.favoriteBlog(blogsDummy)
    expect(result.likes).toEqual(120)
  })
})

//mostBlogs
describe('most blogs', () => {
  test('the author that has the most blogs', () => {
    const result = listHelper.mostBlogs(blogsDummy)
    console.log(result)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 4 })
  })
})

//mostLikes
describe('most likes', () => {
  test('the author that has the most likes from all the blog posts', () => {
    const result = listHelper.mostLikes(blogsDummy)
    console.log(result)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 150 })
  })
})