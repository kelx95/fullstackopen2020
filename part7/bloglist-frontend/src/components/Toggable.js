import React, { useState, useImperativeHandle } from 'react'

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
    <div>
      <div style={hidenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

export default Toggable