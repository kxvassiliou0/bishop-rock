import { useState } from 'react'
import './on-off-toggle-component.styles.css'

export const OnOffToggleComponent = () => {
  const options = ['Off', 'On']
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = (index: number) => {
    setSelectedIndex(index)
    const value = index === 1 ? 1 : 0
    fetch(`/api/onoff?value=${value}`)
      .then(res => {
        if (!res.ok) console.error('Failed to set on/off state')
      })
      .catch(console.error)
  }

  return (
    <div className="onoff-toggle vertical">
      {options.map((option, index) => (
        <button
          key={option}
          className={`onoff-toggle-option ${
            selectedIndex === index ? 'active' : ''
          }`}
          onClick={() => handleClick(index)}
        >
          {option}
        </button>
      ))}
      <div
        className="onoff-toggle-highlight"
        style={{
          transform: `translateY(${selectedIndex * 100}%)`,
        }}
      />
    </div>
  )
}
