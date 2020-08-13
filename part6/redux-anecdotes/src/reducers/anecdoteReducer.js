
const vote = (id) => {
  return ({
    type: 'VOTE',
    data: {
      id
    }
  })
}
const addAnecdote = (data) => {
  return ({
    type: 'NEW_ANECDOTE',
    data
  })
}
const initializeAnecdotes = (data) => {
  return ({
    type: 'INITIALIZE_ANECDOTES',
    data
  })
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
      console.log(action.data)
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state;
  }
}

export { anecdoteReducer, vote, addAnecdote, initializeAnecdotes }