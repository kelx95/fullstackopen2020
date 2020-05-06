import axios from 'axios'

const baseURL = `/api/persons`
const getAll = () => {
    const request = axios.get(`${baseURL}`)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(`${baseURL}`, newPerson)
    return request.then(response => response.data)
    
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}
const updatePeson = (id, updatePerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatePerson)
    return request.then(response => response.data)
}
export default { 
    getAll, 
    create,
    deletePerson,
    updatePeson
  }