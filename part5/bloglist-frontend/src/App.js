import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotificaton] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  //login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const returnedUser = await blogService.login({ username, password })
      setUser(returnedUser)
      localStorage.setItem('user', JSON.stringify(returnedUser))
    } catch (exception) {
      setNotificaton('wrong username or password')
      console.log('error')
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const logOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  //hide the form after creating new blog
  const hideForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      {
        (user === null)
          ? (
            <div>
              <h2>Log in to application</h2>
              {notification && <Notification blog={notification} setNotification={setNotificaton} />}
              {loginForm()}
            </div>
          )
          : (
            <div>
              <h2>blogs</h2>
              {notification && <Notification blog={notification} setNotification={setNotificaton} />}
              {`${user.name} logged in `}
              <button onClick={logOut}>logout</button>
              <br />

              <Toggable buttonLabel='create new' ref={blogFormRef}>
                <BlogForm
                  blogs={blogs}
                  setBlogs={setBlogs}
                  setNotificaton={setNotificaton}
                  hideForm={hideForm}
                />
              </Toggable>

              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
          )
      }
    </div>
  )
}

export default App