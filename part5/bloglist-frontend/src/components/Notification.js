import React from 'react'

const Notificaton = ({ blog, setNotification }) => {
    setTimeout(() => {
        setNotification(null)
    }, 5000)

    if (typeof blog === "object") {
        return (
            <div style={{
                border: '3px solid green',
                backgroundColor: 'lightgrey'
            }}>
                <p style={
                    {
                        color: 'green'
                    }
                }>
                    a new blog {blog.title} by {blog.author} added
                </p>
            </div>
        )
    } else {
        return (
            <div style={{
                border: '3px solid red',
                backgroundColor: 'lightgrey'
            }}>
                <p style={
                    {
                        color: 'red'
                    }
                }>
                    {blog}
                </p>
            </div>)
    }
}

export default Notificaton
