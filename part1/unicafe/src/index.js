import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => 
  <button
    onClick={props.handleClick}>
    {props.buttonName}
  </button>

const Statistic = props => 
  <tr>
    <td>{props.text}</td>
    <td>{(props.text === "positive") ? `${props.value}%` : props.value}</td>
  </tr>

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      {
        (
          props.value.good ||
          props.value.neutral ||
          props.value.bad
        ) ?
          <table>
            <tbody>
              <Statistic text="good" value={props.value.good} />
              <Statistic text="neutral" value={props.value.neutral} />
              <Statistic text="bad" value={props.value.bad} />
              <Statistic text="all" value={props.value.all} />
              <Statistic text="average" value={props.value.average} />
              <Statistic text="positive" value={props.value.positive} />
            </tbody>
          </table> :
          <p>No feedback given</p>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  const all = good + bad + neutral
  const average = (good + (bad * -1)) / all
  const positive = (good) / all * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <Button buttonName={"good"} handleClick={handleGood} />
      <Button buttonName={"neutral"} handleClick={handleNeutral} />
      <Button buttonName={"bad"} handleClick={handleBad} />
      <Statistics
        value={{
          good: good,
          neutral: neutral,
          bad: bad,
          all: all,
          average: average,
          positive: positive
        }}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

