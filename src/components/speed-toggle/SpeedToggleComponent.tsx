import { useState } from 'react'
import './speed-toggle.component.css'

export const SpeedToggleComponent = () => {
  const options = ['0.5x', '1x', '1.5x']
  const [selected, setSelected] = useState(options[0])
  const selectedIndex = options.indexOf(selected)

  return (
    <div className="container">
      <label className="speed-label">Speed</label>
      <div className="segment-toggle horizontal">
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
            width: `${100 / options.length}%`,
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  )
}
