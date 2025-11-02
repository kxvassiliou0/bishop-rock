import { useEffect, useState } from 'react'

export function useConfig() {
  const [onOff, setOnOff] = useState(0) // 0 = off, 1 = on
  const [speed, setSpeed] = useState(1) // default 1x
  const [brightness, setBrightness] = useState(2) // 0..5

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setOnOff(data.onOff)
        setSpeed(data.speed)
        setBrightness(data.brightness)
      })
      .catch(console.error)
  }, [])

  const updateOnOff = (value: number) => {
    setOnOff(value)
    fetch(`/api/onoff?value=${value}`).catch(console.error)
  }

  const updateSpeed = (value: number) => {
    setSpeed(value)
    fetch(`/api/speed?value=${value}`).catch(console.error)
  }

  const updateBrightness = (value: number) => {
    setBrightness(value)
    fetch(`/api/brightness?value=${value}`).catch(console.error)
  }

  return {
    onOff,
    speed,
    brightness,
    updateOnOff,
    updateSpeed,
    updateBrightness,
  }
}
