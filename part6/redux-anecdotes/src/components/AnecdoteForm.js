import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatonReducer'

const AnecdoteForm = ({ addAnecdote, setNotification }) => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        addAnecdote(content)
        setNotification(`new anecdote '${content}'`, 5)
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

// const mapDispatchToProps = dispatch => {
//     return {
//         addAnecdote: content => {
//             dispatch(addAnecdote(content))
//         },
//         setNotification: (message, seconds) => {
//             dispatch(setNotification(message, seconds))
//         }
//     }
// }
const mapDispatchToProps = {
    addAnecdote,
    setNotification
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)
