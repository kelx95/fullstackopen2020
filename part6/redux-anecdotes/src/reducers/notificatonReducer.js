const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'VOTE_NOTIFICATION':
            return state = `you voted '${action.data.content}'`
        case 'NEW_ANECDOTE_NOTIFICATION':
            return state = `New anecdote added '${action.data.content}'`
        case 'REMOVE_NOTIFICATION':
            return state = ''
        default:
            return state;
    }
}
export const vote_notification = (content) => {
    return ({
        type: 'VOTE_NOTIFICATION',
        data: {
            content
        }
    })
}
export const newAnecdote_notification = (content) => {
    return ({
        type: 'NEW_ANECDOTE_NOTIFICATION',
        data: {
            content
        }
    })
}
export const removeNotification = () => {
    return ({
        type: 'REMOVE_NOTIFICATION'
    })
}

export default notificationReducer