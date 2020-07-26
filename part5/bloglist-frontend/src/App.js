import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const returnedUser = await blogService.login({ username, password })
      console.log(returnedUser)
      setUser(returnedUser)
      localStorage.setItem('user', JSON.stringify(returnedUser))
    } catch (exception) {
      console.log('error')
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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
  return (
    <div>
      {
        (user === null)
          ? loginForm()
          : (
            <div>
              <h2>blogs</h2>
              {`${user.name} logged in `}
              <button onClick={logOut}>logout</button>
              <br />
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