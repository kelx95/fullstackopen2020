import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    if (event.target.value === '') {
      dispatch(filterAnecdotes([]))
    } else {
      const filter = event.target.value.toLowerCase()
      const filtered = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      dispatch(filterAnecdotes(filtered))
    }
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter