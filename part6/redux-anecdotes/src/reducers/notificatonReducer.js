const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.message
        case 'REMOVE_NOTIFICATION':
            return state = ''
        default:
            return state;
    }
}

export const setNotification = (message, secondsActive) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(removeNotification())
        }, secondsActive * 1000)

        dispatch({
            type: 'NOTIFICATION',
            data: {
                message
            }
        })
    }
}

export const removeNotification = () => {
    return ({
        type: 'REMOVE_NOTIFICATION'
    })
}

export default notificationReducer