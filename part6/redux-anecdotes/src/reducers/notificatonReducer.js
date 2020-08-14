const initialState = {
    message: [],
    timeoutID: []
}
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            clearTimeout(state.timeoutID[state.timeoutID.length - 1])
            return {
                message: state.message.concat(action.data.message),
                timeoutID: state.timeoutID.concat(action.data.timeoutID)
            }
        case 'REMOVE_NOTIFICATION':
            return state = initialState
        default:
            return state;
    }
}

export const setNotification = (message, secondsActive) => {
    return async dispatch => {
        let timeoutID
        function delayAlert() {
            timeoutID = setTimeout(() => {
                dispatch(removeNotification())
            }, secondsActive * 1000)
        }
        delayAlert()
        dispatch({
            type: 'NOTIFICATION',
            data: {
                message,
                timeoutID
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