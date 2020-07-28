import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, blogs, setBlogs, setNotificaton }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }
  const showWhenVisible = {
    display: view ? '' : 'none'
  }
  const toggleView = () => setView(!view)

  const handleBlogLike = async (blog) => {
    try {
      const updateBlog = await blogService.updateLikes(blog)
      const udpated = blogs.map(blog => blog.id !== updateBlog.id ? blog : updateBlog)
      setBlogs(udpated)
    } catch (exception) {
      console.log(exception)
      setNotificaton('Something went wrong')
    }

  }

  const handleBlogDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const blogToDelete = blog
        const deletedBlog = await blogService.deleteBlog(blog)
        const deleted = blogs.filter(blog => blog.id !== blogToDelete.id)
        setBlogs(deleted)
      }
    } catch (exception) {
      console.log(exception)
      setNotificaton(`Something went wrong blog page will refresh`)
      //get all blogs again
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }

  }
  return (
    <div>
      <div style={blogStyle}>
        {blog.title}
        &nbsp;
        <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
        <div style={showWhenVisible}>
          {blog.url}
          <br />
          {blog.likes}&nbsp;<button onClick={() => handleBlogLike(blog)}>like</button>
          <br />
          {blog.author}
          <br />
          <button onClick={() => handleBlogDelete(blog)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
