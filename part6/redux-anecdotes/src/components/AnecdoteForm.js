import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, newAnecdote_notification } from '../reducers/notificatonReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = await anecdoteService.addNewAnecdote(content)
        dispatch(addAnecdote(anecdote))
        dispatch(newAnecdote_notification(anecdote.content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
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
