import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const login = async (user) => {
  const response = await axios.post('/api/login', user)
  console.log('login service token', token)
  return response.data
}

const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`
  },
}

const createNewBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const updateLikes = async (updateBlog) => {
  const updatedBlog = {
    ...updateBlog,
    likes: updateBlog.likes + 1
  }
  const response = await axios.put(`/api/blogs/${updateBlog.id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`/api/blogs/${blog.id}`, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, login, createNewBlog, updateLikes, deleteBlog }