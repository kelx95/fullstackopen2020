import usersService from '../services/users'

import {
    setNotification
} from './notificationReducer'

const initializeUsers = () => {
    return async dispatch => {
        try {
            const allUsers = await usersService.getAllUsers()
            dispatch({
                type: 'INITIALIZE_USERS',
                data: allUsers
            })   
        } catch (error) {
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))
            console.log(error)  
        }
        
    }
}

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE_USERS':
            console.log('users reducer state', [...state, ...action.data])
            return [...state, ...action.data]
        default:
            return state
    }
}

export {
    usersReducer,
    initializeUsers,
}