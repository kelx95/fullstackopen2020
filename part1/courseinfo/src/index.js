import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return (
    props.parts.map((part, i) => {
      return <p key={i}>{part.name} {part.exercises}</p>
    })
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>{props.parts.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.exercises
    }, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))