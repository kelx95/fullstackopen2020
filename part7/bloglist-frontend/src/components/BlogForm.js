import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogsReducer'
import {useField} from "../hooks/index";

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
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            {...title}
          />
        </div>
        <div>
          author:
          <input
            {...author}
          />
        </div>
        <div>
          url:
          <input
            {...url}
          />
        </div>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
