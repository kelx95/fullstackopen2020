const initialState = {
    type: '',
    message: [],
    timeoutID: []
}

const setNotification = (message, secodsActive, type = 'ok') => {
    return async dispatch => {
        let timeoutID
        function delayAlert() {
            timeoutID = setTimeout(() => {
                dispatch(removeNotification())
            }, secodsActive * 1000)
        }
        delayAlert()
        dispatch({
            type: 'NOTIFICATION',
            data: {
                type,
                message,
                timeoutID
            }
        })
    }
}

const removeNotification = () => {
    return({
        type: 'REMOVE_NOTIFICATION'
    })
}

const notificationReducer = ( state= initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            //remove the previous notification
            clearTimeout(state.timeoutID[state.timeoutID.length - 1])
            return {
                type: action.data.type,
                message: [...state.message, action.data.message],
                timeoutID: [...state.timeoutID, action.data.timeoutID]
            }
        case 'REMOVE_NOTIFICATION':
            return state = initialState
        default:
            return state
    }
}

export { notificationReducer, setNotification, removeNotification }