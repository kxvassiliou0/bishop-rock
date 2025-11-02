import './speed-toggle.component.css'

interface SpeedToggleProps {
  value: number
  onChange: (value: number) => void
}

export const SpeedToggleComponent = ({ value, onChange }: SpeedToggleProps) => {
  const options = [0.5, 1, 1.5]
  const selectedIndex = options.indexOf(value)

  return (
    <div className="speed-toggle-container">
      <label className="speed-toggle-label">Speed</label>
      <div className="speed-toggle horizontal">
        {options.map((option, index) => (
          <button
            key={option}
            className={`speed-toggle-option ${
              selectedIndex === index ? 'active' : ''
            }`}
            onClick={() => onChange(option)}
          >
            {option}x
          </button>
        ))}
        <div
          className="speed-toggle-highlight"
          style={{
            width: `${100 / options.length}%`,
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  )
}
