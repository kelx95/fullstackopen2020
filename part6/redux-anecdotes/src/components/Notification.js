import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div>
      {notification[notification.length - 1] ?
        <div style={style}>
          {notification[notification.length - 1]}
        </div>
        : null}
    </div>
  )
}

export default Notification