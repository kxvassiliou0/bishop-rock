import { useState } from 'react'
import './vertical-toggle-component.styles.css'

export const VerticalToggleComponent = () => {
  const options = ['Off', 'On']
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="segment-toggle vertical">
      {options.map(option => (
        <button
          key={option}
          className={`segment-option ${selected === option ? 'active' : ''}`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
      <div
        className="segment-highlight"
        style={{
          height: `${100 / options.length}%`,
          top: `${(options.indexOf(selected) * 100) / options.length}%`,
        }}
      />
    </div>
  )
}
