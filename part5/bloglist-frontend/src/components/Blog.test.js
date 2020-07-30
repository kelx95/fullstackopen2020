import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('blog renders the blogs title but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'test test blog-#1',
    author: 'testAuthor',
    url: 'no-url'
  }
  const component = render(
    <Blog blog={blog} />
  )
  const el = component.container.querySelector('.container')
  expect(el).toHaveTextContent('test test blog-#1')
  //console.log(prettyDOM(el))
})

test('blog\'s url and number of likes are shown when \'view\' is clicked', () => {
  const blog = {
    title: 'test test blog-#1',
    author: 'testAuthor',
    url: 'no-url'
  }
  const component = render(
    <Blog blog={blog} />
  )
  //console.log(prettyDOM(component.container.querySelector('.container')))
  const button = component.container.querySelector('.view')
  fireEvent.click(button)

  //console.log(prettyDOM(component.container.querySelector('.like')))
  expect(component.container.querySelector('.like')).toBeDefined()
  expect(component.container.querySelector('.like')).toHaveTextContent(
    'like'
  )
  //console.log(prettyDOM(component.container.querySelector('.delete')))
  expect(component.container.querySelector('.delete')).toBeDefined()
  expect(component.container.querySelector('.delete')).toHaveTextContent(
    'Remove'
  )
  //console.log(prettyDOM(component.container.querySelector('.container')))
})

test('if the like is clicked twice, the event handler that is received as props is called twice', () => {
  const blog = {
    title: 'test test blog-#1',
    author: 'testAuthor',
    url: 'no-url'
  }
  //the handler is mock function defined with Jest
  const handleBlogLike = jest.fn()
  const component = render(
    <Blog blog={blog} handleBlogLike={handleBlogLike} />
  )
  //click the view button
  const button = component.container.querySelector('.view')
  fireEvent.click(button)
  //console.log(prettyDOM(component.container.querySelector('.viewSection')))

  //click like button twice
  const likeButton = component.container.querySelector('.like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleBlogLike.mock.calls).toHaveLength(2)
  //console.log(prettyDOM(component.container.querySelector('.viewSection')))
})

test('check that the form calls the event handler is received as props with the right details', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: {
      value: 'test1 title'
    }
  })
  fireEvent.change(inputAuthor, {
    target: {
      value: 'test1 author'
    }
  })
  fireEvent.change(inputUrl, {
    target: {
      value: 'test1 url'
    }
  })
  fireEvent.submit(form)
  //console.log(createBlog.mock.calls[0][0])
  expect(JSON.stringify(createBlog.mock.calls[0][0])).toBe(JSON.stringify({ title: 'test1 title', author: 'test1 author', url: 'test1 url' }))
})

//CI=true npm test