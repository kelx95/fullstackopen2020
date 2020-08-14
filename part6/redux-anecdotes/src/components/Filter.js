import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = ({ anecdotes, filterAnecdotes }) => {
  const handleChange = (event) => {
    if (event.target.value === '') {
      filterAnecdotes()
    } else {
      const filter = event.target.value.toLowerCase()
      filterAnecdotes(filter, anecdotes)
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
const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterAnecdotes: (filter, anecdotes) => {
      dispatch(filterAnecdotes(filter, anecdotes))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)