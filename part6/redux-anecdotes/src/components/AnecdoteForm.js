import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            dispatch(addAnecdote(event.target.anecdote.value))
            event.target.anecdote.value = ''
        }}>
            <div><input name='anecdote' /></div>
            <button type="submit">create</button>
        </form>
    )
}
export default AnecdoteForm
