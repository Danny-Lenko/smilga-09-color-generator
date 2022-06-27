import React, { useEffect, useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'
import { nanoid } from 'nanoid'

function App() {
  const [userInput, setUserInput] = useState('')
  const [color, setColor] = useState(new Values('#f15025'))
  const [isError, setIsError] = useState(false)
  const [userColors, setUserColors] = useState([])

  function handleUserInput(e) {
    setUserInput(e.target.value)
  }

  function submitColor(e, inputData) {
    e.preventDefault()
    try {
      setColor(new Values(inputData))      
    } catch (error) {
      console.log(error)
      setIsError(true)
      setUserInput('')
    }
  }

  useEffect(() => {
    const tints = color.tints(10).reverse()
    const shades = color.shades(10)
    setUserColors([...tints, color, ...shades])
  }, [color])

  const allColors = userColors.map(color => (
    <SingleColor 
      key={nanoid()} 
      {...color} 
    />
  ))

  return (
    <main className="section">
      <div className="container">
        <h3>color generator</h3>

        <form onSubmit={ (e) => submitColor(e, userInput) }>
          <input 
            className={`${isError && 'error'}`}
            type="text"
            placeholder="#f15025"
            value={userInput}
            onChange={handleUserInput}
          />
          <button className="btn">submit</button>
        </form>

      </div>
      <div className="colors">{allColors}</div>
    </main>
  )
}

export default App
