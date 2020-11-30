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
            return [...state, ...action.data]
        case 'NEW_BLOG':
            const newState = [...state]
            const userFound = newState.find(user => user.id === action.data.user)
            userFound.blogs.push(action.data)
            return newState
        case 'LOGOUT':
            return state = []
        default:
            return state
    }
}

export {
    usersReducer,
    initializeUsers,
}