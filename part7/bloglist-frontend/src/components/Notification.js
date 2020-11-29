import React from 'react'
import { useSelector } from 'react-redux'

const Notificaton = () => {
  const notification = useSelector(state => state.notification.message)
  const notificationType = useSelector(state => state.notification.type)
  console.log(notificationType)

  const style = {
    border: '3px solid green',
    padding: 10,
    borderWidth: 1
  }

  const errorStyle = {
    border: '3px solid red',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div>
      {(notification[notification.length - 1] && notificationType) ?
        (notificationType !== "error")
        ?
          <div style={style}>
            {notification[notification.length - 1]}
          </div>
          :
          <div style={errorStyle}>
          {notification[notification.length - 1]}
      </div>
      :
       null 
      }
    </div>
  )

  // if (typeof blog === 'object') {
  //   return (
  //     <div className='error' style={{
  //       border: '3px solid green',
  //       backgroundColor: 'lightgrey',
  //       color: 'green'
  //     }}>
  //       <p>
  //         a new blog {blog.title} by {blog.author} added
  //       </p>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className='error' style={{
  //       border: '3px solid red',
  //       backgroundColor: 'lightgrey',
  //       color: 'red'
  //     }}>
  //       <p>
  //         {blog}
  //       </p>
  //     </div>)
  // }
}

export default Notificaton
