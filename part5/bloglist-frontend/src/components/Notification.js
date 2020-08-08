import React from 'react'

const Notificaton = ({ blog, setNotification }) => {
  setTimeout(() => {
    setNotification(null)
  }, 3000)

  if (typeof blog === 'object') {
    return (
      <div style={{
        border: '3px solid green',
        backgroundColor: 'lightgrey',
        color: 'green'
      }}>
        <p>
          a new blog {blog.title} by {blog.author} added
        </p>
      </div>
    )
  } else {
    return (
      <div className='error' style={{
        border: '3px solid red',
        backgroundColor: 'lightgrey',
        color: 'red'
      }}>
        <p>
          {blog}
        </p>
      </div>)
  }
}

export default Notificaton
