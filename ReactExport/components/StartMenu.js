import React from 'react'
import * as gFunctions from '../functions/globalFunctions'


export const StartMenu = ({toggleVisibility}) => {

  const click = async (e) => {
     await toggleVisibility('StartMenu','PlayerNameSelector')
  }

  return (
  <div>
    <h1 id="subject">Tic Tac Toe</h1>
    <button className="btn" type="button" onClick={click}>Click me to start</button>
  </div>
  )
}
