import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

//wrapped with () to use ref
const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  //button that is used for 'toggle'
  //visible-false shows the button
  const hidenWhenVisible = {
    display: visible ? 'none' : ''
  }
  //showing the form if visible true
  const showWhenVisible = {
    display: visible ? '' : 'none'
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //used for defining functions in a component which can be invoked outside of the component
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{marginBottom: '10px'}}>
      <div style={hidenWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

export default Toggable