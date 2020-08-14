import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatonReducer'

const AnecdoteList = ({ anecdotes, filtered, voteAnecdote, setNotification }) => {
    const handleVote = (anecdote) => {
        voteAnecdote(anecdote.id)
        setNotification(`you voted '${anecdote.content}'`, 5)
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
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filtered: state.filter
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         voteAnecdote: value => {
//             dispatch(voteAnecdote(value))
//         },
//         setNotification: (message, seconds) => {
//             dispatch(setNotification(message, seconds))
//         }
//     }
// }
const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

//export default AnecdoteList
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
