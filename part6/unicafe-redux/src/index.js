
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
//redux store
const store = createStore(reducer)

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
  //
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button buttonName={"good"} handleClick={good} />
      <Button buttonName={"neutral"} handleClick={neutral} />
      <Button buttonName={"bad"} handleClick={bad} />
      <Button buttonName={"reset"} handleClick={zero} />
      <Statistics
        value={{
          good: store.getState().good,
          neutral: store.getState().ok,
          bad: store.getState().bad,

          all: store.getState().good + store.getState().bad + store.getState().ok,
          average: (store.getState().good + (store.getState().bad * -1)) / (store.getState().good + store.getState().bad + store.getState().ok),
          positive: (store.getState().good) / (store.getState().good + store.getState().bad + store.getState().ok) * 100
        }}
      />
    </div>
  )
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)


