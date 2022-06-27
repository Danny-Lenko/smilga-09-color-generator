import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({ rgb, weight, type }) => {
  const [copyState, setCopyState] = useState(false)

  function copyToClipboard(content) {
    navigator.clipboard.writeText(content)
  }

  useEffect(() => {
    setTimeout( () => setCopyState(false), 3000 )
  }, [copyState])
  
  return (
    <div 
      style={{backgroundColor: `${rgbToHex(...rgb)}`}} 
      className="color"
      onClick={() => {
        copyToClipboard( rgbToHex(...rgb) )
        setCopyState(true)
      }}
    >
      <div className={ `${type === 'shade' && 'color-light'}` }>
        <p className="percent-value">{weight}%</p>
        <p className="color-value">{ rgbToHex(...rgb) }</p>
      </div>
      
      { copyState && <div className="alert">copied to clipboard</div> }
    </div>
  )
}

export default SingleColor
