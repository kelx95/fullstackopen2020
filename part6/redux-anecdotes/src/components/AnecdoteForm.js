import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification } from '../reducers/notificatonReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(event) => {
                event.preventDefault()
                dispatch(addAnecdote(event.target.anecdote.value))
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000);
                event.target.anecdote.value = ''
            }}>
                <div><input name='anecdote' /></div>
                <button type="submit">create</button>
            </form>
            <br />
        </div>
    )
}
export default AnecdoteForm
