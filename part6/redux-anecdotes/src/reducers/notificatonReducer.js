const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'VOTE':
            return state = `you voted '${action.data.content}'`
        case 'NEW_ANECDOTE':
            return state = `New anecdote added '${action.data.content}'`
        case 'REMOVE_NOTIFICATION':
            return state = ''
        default:
            return state;
    }
}

export const removeNotification = () => {
    return ({
        type: 'REMOVE_NOTIFICATION'
    })
}

export default notificationReducer