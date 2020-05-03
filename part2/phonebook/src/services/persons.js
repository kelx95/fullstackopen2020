import axios from 'axios'

const baseURL = `http://localhost:3001`

const getAll = () => {
    const request = axios.get(`${baseURL}/persons`)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(`${baseURL}/persons`, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/persons/${id}`)
}

const updatePeson = (id, updatePerson) => {
    const request = axios.put(`${baseURL}/persons/${id}`, updatePerson)
    return request.then(response => response.data)
}
export default { 
    getAll, 
    create,
    deletePerson,
    updatePeson
  }