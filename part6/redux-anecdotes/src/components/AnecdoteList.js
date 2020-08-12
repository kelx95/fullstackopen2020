import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, vote_notification } from '../reducers/notificatonReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filtered = useSelector(state => state.filter)
    const dispatch = useDispatch()
    return (
        <div>
            {(filtered.length > 0 && filtered.length < anecdotes.length) ?
                <div>
                    {filtered.map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => {
                                    dispatch(vote(anecdote.id))
                                    dispatch(vote_notification(anecdote.content))
                                    setTimeout(() => {
                                        dispatch(removeNotification())
                                    }, 5000);
                                }}>vote</button>
                            </div>
                        </div>
                    )}
                </div>
                :
                <div>
                    {anecdotes.map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => {
                                    dispatch(vote(anecdote.id))
                                    dispatch(vote_notification(anecdote.content))
                                    setTimeout(() => {
                                        dispatch(removeNotification())
                                    }, 5000);
                                }}>vote</button>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default AnecdoteList
