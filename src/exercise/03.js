// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext(null);
function Toggle({children}) {
  const [on, setOn] = React.useState(true)
  const toggle = () => setOn(!on)

  const value = [on,toggle];
  return <ToggleContext.Provider value = {value} children = {children}/>
}
function useToggle(){
  const context = React.useContext(ToggleContext);
  if(!context){
    throw new Error("The Component is not wrapped with Toggle Context Hooks");
  }
  return context;
}
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://react.dev/reference/react/useContext
function ToggleOn({children}) {
  const [on] = useToggle();
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const [on] = useToggle();
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {

  const [on,toggle] = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
