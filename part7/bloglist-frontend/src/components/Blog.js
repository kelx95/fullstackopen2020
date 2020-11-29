import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  const toggleView = () => setView(!view)

  return (
    <div style={blogStyle} className="container">

      <div>
        <div style={{ display: 'inline' }} className="title">{blog.title}</div>
        &nbsp;
        <button className="view" onClick={toggleView}>{view ? 'hide' : 'view'}</button>
      </div>

      {view && (
        <div className="viewSection">
          <div>{blog.url}</div>
          <div>{blog.likes}&nbsp;<button className="like" onClick={() => dispatch(likeBlog(blog))}>like</button></div>
          <div>{blog.author}</div>
          <button className="delete" onClick={() => dispatch(deleteBlog(blog))}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
