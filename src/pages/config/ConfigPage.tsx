import BackChevron from '../../assets/BackChevron.svg'
import {
  BrightnessSliderComponent,
  OnOffToggleComponent,
  SpeedToggleComponent,
} from '../../components'
import { useConfig } from '../../hooks/useConfig'
import './config-page.styles.css'

export default function ConfigPage({
  onBackClick,
}: {
  onBackClick: () => void
}) {
  const {
    onOff,
    speed,
    brightness,
    updateOnOff,
    updateSpeed,
    updateBrightness,
  } = useConfig()

  return (
    <div className="config-container">
      <div className="config-header">
        <div className="config-title-row">
          <button className="config-back-button" onClick={onBackClick}>
            <img src={BackChevron} alt="Back" className="config-back-icon" />
          </button>
          <h1>Config</h1>
        </div>
        <OnOffToggleComponent value={onOff} onChange={updateOnOff} />
      </div>

      <BrightnessSliderComponent
        value={brightness}
        onChange={updateBrightness}
      />
      <SpeedToggleComponent value={speed} onChange={updateSpeed} />
    </div>
  )
}
