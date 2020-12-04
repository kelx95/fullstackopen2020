import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogsReducer'
import {useField} from "../hooks/index";
import {Form, Button } from 'react-bootstrap'

const BlogForm = ( { hideForm }) => {
  const dispatch = useDispatch()

  const title = useField("text", "title", "title")
  const author = useField("text", "author", "author")
  const url = useField("text", "url", "url")
  
  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    dispatch(addNewBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }))
    title.onReset()
    author.onReset()
    url.onReset()
    hideForm()
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleCreateNewBlog}>
            <Form.Group>
              <Form.Label>title:</Form.Label>
              <Form.Control
                {...title}
              />
              <Form.Label>author:</Form.Label>
              <Form.Control
                {...author}
              />
              <Form.Label>url:</Form.Label>
              <Form.Control
                {...url}
              />
              <Button id='create' variant="primary" type="submit" style={{marginTop: '10px'}}>
              create
              </Button>
            </Form.Group>
      </Form> 
    </div>
  )
}

export default BlogForm
