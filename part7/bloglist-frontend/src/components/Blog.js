import React from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="container">
        <div style={{ display: 'inline' }} className="title">{blog.title}</div>
    </div>
  )
}

export default Blog
