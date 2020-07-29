import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, setNotificaton, hideForm }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.createNewBlog({
        title,
        author,
        url
      })
      //update the blog list
      setNotificaton(returnedBlog)
      setBlogs([...blogs, returnedBlog])
      //empty the form
      setTitle('')
      setAuthor('')
      setUrl('')
      ///hide the form
      hideForm()
    } catch (exception) {
      setNotificaton('something went wrong try again....')
      console.log('error')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
PropTypes.propTypes = {
  blogs: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotificaton: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired
}
export default BlogForm
