import { useEffect, useRef, useState } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const updateValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return
    const { left, width } = trackRef.current.getBoundingClientRect()
    let relativeX = clientX - left
    relativeX = Math.max(0, Math.min(relativeX, width))
    const segmentWidth = width / segments
    const newValue = Math.ceil(relativeX / segmentWidth)
    onChange(newValue)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateValueFromPosition(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) updateValueFromPosition(e.clientX)
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) updateValueFromPosition(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="brightness-slider">
      <div className="labels">
        <label className="brightness-label">Brightness</label>
        <span className="brightness-value">
          {Math.round((value / segments) * 100)}%
        </span>
      </div>

      <div
        ref={trackRef}
        className="brightness-track"
        onMouseDown={handleMouseDown}
        onTouchStart={e => {
          setIsDragging(true)
          updateValueFromPosition(e.touches[0].clientX)
        }}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`brightness-segment ${i < value ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
