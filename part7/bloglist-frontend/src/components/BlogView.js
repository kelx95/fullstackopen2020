import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'

const BlogView = () => {
    const dispatch = useDispatch()
    const match = useRouteMatch('/blogs/:id')
    const blogs = useSelector(state => state.blogs)

    const blog = match ?
        blogs.find(blog=> blog.id === String(match.params.id))
        :null
    
    if(!blog) return null
    
    return (
        <div>
            <br />
            <h2>{blog.title}</h2>  
            <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a>
            <div>
                <p style={{ display: 'inline' }}>{`${blog.likes} likes`}</p>
                &nbsp;<button onClick={() => dispatch(likeBlog(blog))}>like</button>
            </div>
            <p>{`added by ${blog.author}`}</p>
        </div>
    )
}

export default BlogView
