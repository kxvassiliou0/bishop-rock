import { useState } from 'react'
import './speed-toggle.component.css'

export const SpeedToggleComponent = () => {
  const options = ['0.5x', '1x', '1.5x']
  const [selected, setSelected] = useState(options[0])
  const selectedIndex = options.indexOf(selected)

  // Convert option string to number
  const optionToNumber = (option: string) => parseFloat(option)

  const handleClick = (option: string) => {
    setSelected(option)
    const value = optionToNumber(option)
    // Send value to ESP8266
    fetch(`/api/speed?value=${value}`)
      .then(res => {
        if (!res.ok) console.error('Failed to set speed')
      })
      .catch(console.error)
  }

  return (
    <div className="container">
      <label className="speed-label">Speed</label>
      <div className="segment-toggle horizontal">
        {options.map(option => (
          <button
            key={option}
            className={`segment-option ${selected === option ? 'active' : ''}`}
            onClick={() => handleClick(option)}
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
