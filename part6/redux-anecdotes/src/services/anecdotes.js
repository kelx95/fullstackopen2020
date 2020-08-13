import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAllAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNewAnecdote = async (content) => {
    const newAnecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const voteAnecdote = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    const response = await axios.put(`${baseUrl}/${id}`, { ...anecdote.data, votes: anecdote.data.votes + 1 })
    return response.data
}

export default { getAllAnecdotes, addNewAnecdote, voteAnecdote }