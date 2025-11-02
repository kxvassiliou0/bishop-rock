import './brightness-slider-component.styles.css'

interface BrightnessSliderProps {
  value: number
  onChange: (value: number) => void
}

export const BrightnessSliderComponent = ({
  value,
  onChange,
}: BrightnessSliderProps) => {
  const segments = 5

  return (
    <div className="brightness-slider">
      <div className="labels">
        <label className="brightness-label">Brightness</label>
        <span className="brightness-value">
          {Math.round((value / segments) * 100)}%
        </span>
      </div>

      <div className="brightness-track">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`brightness-segment ${i < value ? 'active' : ''}`}
            onClick={() => onChange(i + 1)}
          />
        ))}
      </div>
    </div>
  )
}
