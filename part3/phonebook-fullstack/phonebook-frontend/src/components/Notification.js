import React from 'react'

const Notification = ({ message, colorNotification }) => {
    return (
        <div className={colorNotification}>
            {message}
        </div>
    )
}

export default Notification

