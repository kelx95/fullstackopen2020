import anecdoteService from '../services/anecdotes'

const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }
}
const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNewAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

const initializeAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await anecdoteService.getAllAnecdotes()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: allAnecdotes
    })
  }
}
//Reducer
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.filter(anecdote => anecdote.id === action.data.id)[0]
      votedAnecdote.votes += 1;
      return [
        ...state.map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
      ].sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return [
        ...state,
        action.data
      ].sort((a, b) => b.votes - a.votes)
    case 'INITIALIZE_ANECDOTES':
      //console.log(action.data)
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state;
  }
}

export { anecdoteReducer, voteAnecdote, addAnecdote, initializeAnecdotes }