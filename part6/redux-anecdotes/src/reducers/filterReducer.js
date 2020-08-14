
const filterReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_FILTER':
            const { filter = '', anecdotes = [] } = action.data
            const filtered = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
            return [
                ...filtered
            ]
        default:
            return state
    }
}

export const filterAnecdotes = (filter, anecdotes) => {
    return {
        type: 'NEW_FILTER',
        data: {
            filter,
            anecdotes
        }
    }
}

export default filterReducer