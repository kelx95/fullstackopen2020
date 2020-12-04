import React from 'react'
import { useSelector } from 'react-redux'
import {
    useRouteMatch,
  } from "react-router-dom";
import { ListGroup, ListGroupItem} from 'react-bootstrap'

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
           <ListGroup className="list-group-flush">
            {user.blogs.map((blog) => (
                <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
            ))}
         </ListGroup>

        </div>
    )
}

export default UsersView

