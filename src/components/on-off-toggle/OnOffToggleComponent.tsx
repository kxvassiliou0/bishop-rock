import { useState } from 'react'
import './on-off-toggle-component.styles.css'

export const OnOffToggleComponent = () => {
  const options = ['Off', 'On']
  const [selected, setSelected] = useState(options[0])

  const handleClick = (option: string) => {
    setSelected(option)
    const value = option === 'On' ? 1 : 0
    fetch(`/api/onoff?value=${value}`)
      .then(res => {
        if (!res.ok) console.error('Failed to set on/off state')
      })
      .catch(console.error)
  }

  return (
    <div className="segment-toggle vertical">
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
          height: `${100 / options.length}%`,
          top: `${(options.indexOf(selected) * 100) / options.length}%`,
        }}
      />
    </div>
  )
}
