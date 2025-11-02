import './on-off-toggle-component.styles.css'

interface OnOffToggleProps {
  value: number
  onChange: (value: number) => void
}

export const OnOffToggleComponent = ({ value, onChange }: OnOffToggleProps) => {
  const options = ['Off', 'On']

  return (
    <div className="onoff-toggle">
      {options.map((option, index) => (
        <button
          key={option}
          className={`onoff-toggle-option ${value === index ? 'active' : ''}`}
          onClick={() => onChange(index)}
        >
          {option}
        </button>
      ))}
      <div
        className="onoff-toggle-highlight"
        style={{
          width: `${100 / options.length}%`,
          transform: `translateX(${value * 100}%)`,
        }}
      />
    </div>
  )
}
