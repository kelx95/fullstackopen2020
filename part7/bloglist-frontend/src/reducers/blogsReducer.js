import blogService from '../services/blogs'
import {
    setNotification
} from './notificationReducer'

const initializeBlogs = () => {
    return async dispatch => {
        try {
            const allBlogs = await blogService.getAll()
            dispatch({
                type: 'INITIALIZE_BLOGS',
                data: allBlogs
            })   
        } catch (error) {
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))
            console.log(error)  
        }
        
    }
}

const addNewBlog = (content) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.createNewBlog(content)
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog
            })
            dispatch(setNotification(` a new blog ${newBlog.title} by ${newBlog.author} added`, 10 ))  
        } catch (error) {
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))  
            
        }
    }
}

const addComment = (content, blogId) => {
    return async dispatch => {
        try {
            const comment = {
                content
            }
            const returnedBlog = await blogService.addComment(comment, blogId)
            dispatch({
                type: 'NEW_COMMENT',
                data: returnedBlog
            })
            dispatch(setNotification(` a new comment added to blog ${returnedBlog.title}`, 10 ))  
        } catch (error) {
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))  
            
        }
    }
}

const likeBlog = (blog) => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.updateLikes(blog)
            dispatch({
                type: 'LIKE',
                data: updatedBlog
            })    
        } catch (error) {
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))   
        }
        
    }
}

const deleteBlog = (blog) => {
    return async dispatch => {
        try {
            const idBlogToDelete = blog.id
            await blogService.deleteBlog(blog)
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                dispatch({
                    type: 'DELETE',
                    data: idBlogToDelete
                })
            }   
        } catch (error) {
            dispatch(setNotification(`somithing went bad`, 10, 'error' ))   
        }
    }
}

const sortByLikes = (blogs) => blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE_BLOGS':
            return sortByLikes([...state, ...action.data])
        case 'NEW_BLOG':
            return [
                ...state,
                action.data
            ]
        case 'LIKE':
            const blogs = [...state]
                .map(blog => blog.id !== action.data.id ? blog : action.data)
            return sortByLikes(blogs)
        case 'DELETE':
            return [
                ...state
            ].filter(blog => blog.id !== action.data)
        case 'NEW_COMMENT':
            const blogsCommented = [...state]
                .map(blog => blog.id !== action.data.id ? blog : action.data)
                return sortByLikes(blogsCommented)
        case 'LOGOUT':
            return state = []
        default:
            return state
    }
}

export {
    blogsReducer,
    initializeBlogs,
    addNewBlog,
    likeBlog,
    deleteBlog,
    addComment
}