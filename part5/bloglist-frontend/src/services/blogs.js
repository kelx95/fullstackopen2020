import axios from 'axios'
const baseUrl = '/api/blogs'
let loggedInToken = ''

const getToken = token => {
  loggedInToken = `bearer ${token}`
}
const login = async (user) => {
  const response = await axios.post('/api/login', user)
  return response.data
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, login }