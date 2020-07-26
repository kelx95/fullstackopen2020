import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const login = async (user) => {
  const response = await axios.post('/api/login', user)
  console.log('login service token', token)
  return response.data
}

const createNewBlog = async (newBlog) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, login, createNewBlog }