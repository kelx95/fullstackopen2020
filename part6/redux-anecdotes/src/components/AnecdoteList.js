import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificatonReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filtered = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }

    return (
        <div>
            {(filtered.length > 0 && filtered.length < anecdotes.length) ?
                <Fragment>
                    {filtered.map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => handleVote(anecdote)}>vote</button>
                            </div>
                        </div>
                    )}
                </Fragment>
                :
                <Fragment>
                    {anecdotes.map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => handleVote(anecdote)}>vote</button>
                            </div>
                        </div>
                    )}
                </Fragment>
            }
        </div>
    )
}

export default AnecdoteList
