import blogService from '../services/blogs'
import {
    setNotification
} from './notificationReducer'

const logIn = (user) => {
    return async dispatch => {
        try {
            const logedInUser = await blogService.login(user)
            localStorage.setItem('user', JSON.stringify(logedInUser))
            dispatch({
                type: 'LOGIN',
                data: logedInUser
            })   
        } catch (error) {
            console.log(error)
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))  
        }
        
    }
}

const logOut = () => {
    localStorage.removeItem('user')
    return({
        type: 'LOGOUT'
    })
}

const loggedIn = (user) => {
    return({
        type: 'LOGGED',
        data: user
    })
}
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGGED':  
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export {
    userReducer,
    logIn,
    logOut,
    loggedIn
}