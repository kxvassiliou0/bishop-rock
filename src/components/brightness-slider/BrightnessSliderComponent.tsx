import { useState } from 'react'
import './brightness-slider-component.styles.css'

export const BrightnessSliderComponent = () => {
  const segments = 5
  const [level, setLevel] = useState(2)

  const handleClick = (index: number) => {
    const newLevel = index + 1
    setLevel(newLevel)

    const brightnessValue = Math.round((newLevel / segments) * 255)

    fetch(`/api/brightness?value=${brightnessValue}`)
      .then(res => {
        if (!res.ok) console.error('Failed to set brightness')
      })
      .catch(console.error)
  }

  return (
    <div className="brightness-slider">
      <div className="labels">
        <label className="brightness-label">Brightness</label>
        <span className="brightness-value">
          {Math.round((level / segments) * 100)}%
        </span>
      </div>

      <div className="brightness-track">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`brightness-segment ${i < level ? 'active' : ''}`}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  )
}
