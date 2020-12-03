import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const login = async (user) => {
  console.log('login post ')
  console.log(user)
  const response = await axios.post('http://localhost:3001/api/login', user)
  console.log('login service token', token)
  return response.data
}

const configFunc = () => (
  {
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  }
)
// const config = {
//   headers: {
//     Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`
//   },
// }

const createNewBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, configFunc())
  return response.data
}

const addComment = async (comment, blogId) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment, configFunc())
  return response.data
}

const updateLikes = async (updateBlog) => {
  const updatedBlog = {
    ...updateBlog,
    likes: updateBlog.likes + 1
  }
  const response = await axios.put(`/api/blogs/${updateBlog.id}`, updatedBlog, configFunc())
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`/api/blogs/${blog.id}`, configFunc())
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, login, createNewBlog, updateLikes, deleteBlog, addComment }