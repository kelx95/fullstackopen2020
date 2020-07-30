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
  ////////
  console.log(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes))

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

  //passed to BlogForm as prop
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.createNewBlog(blogObject)
      //hide the form
      blogFormRef.current.toggleVisibility()
      //update the blog list
      setNotificaton(returnedBlog)
      setBlogs([...blogs, returnedBlog])
    } catch (exception) {
      setNotificaton('something went wrong try again....')
      console.log('error')
    }
  }


  const likeBlog = async (blog) => {
    try {
      const updateBlog = await blogService.updateLikes(blog)
      const udpated = blogs.map(blog => blog.id !== updateBlog.id ? blog : updateBlog)
      setBlogs(udpated)
    } catch (exception) {
      console.log(exception)
      setNotificaton('Something went wrong')
    }

  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const blogToDelete = blog
        await blogService.deleteBlog(blog)
        const deleted = blogs.filter(blog => blog.id !== blogToDelete.id)
        setBlogs(deleted)
      }
    } catch (exception) {
      console.log(exception)
      setNotificaton('Something went wrong blog page will refresh')
      //get all blogs again
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
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
              <br />
              <Toggable buttonLabel='create new' ref={blogFormRef}>
                <BlogForm
                  createBlog={addBlog}
                />
              </Toggable>
              <br />
              {blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleBlogLike={likeBlog}
                  handleBlogDelete={deleteBlog}
                />
              ).sort((blog1, blog2) => blog2.likes - blog1.likes)

              }
            </div>
          )
      }
    </div>
  )
}

export default App