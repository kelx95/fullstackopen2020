import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificatonReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`new anecdote '${content}'`, 5))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote' /></div>
                <button type="submit">create</button>
            </form>
            <br />
        </div>
    )
}
export default AnecdoteForm
