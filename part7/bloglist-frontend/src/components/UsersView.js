import React from 'react'
import { useSelector } from 'react-redux'
import {
    useRouteMatch,
  } from "react-router-dom";

const UsersView = () => {
    const match = useRouteMatch('/users/:id')
    const users = useSelector(state => state.users)

    const user = match
    ? users.find(user => user.id === String(match.params.id))
    : null

    if(!user) return null

    return (
        <div>
            <h1>{user.name}</h1>
           <h2>added blogs</h2>
           <br />
           <ul>
            {
                user.blogs.map(blog => <li key={blog.id} style={{marginLeft: 10}} >
                    {blog.title}    
                </li>)
            }
           </ul> 
        </div>
    )
}

export default UsersView

