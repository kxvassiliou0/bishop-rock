import BackChevron from '../../assets/BackChevron.svg'
import {
  BrightnessSliderComponent,
  OnOffToggleComponent,
  SpeedToggleComponent,
} from '../../components'
import './config-page.styles.css'

interface ConfigPageProps {
  onBackClick: () => void
}

export default function ConfigPage({ onBackClick }: ConfigPageProps) {
  return (
    <div className="config-container">
      <div className="config-header">
        <div className="config-title-row">
          <button className="config-back-button" onClick={onBackClick}>
            <img src={BackChevron} alt="Back" className="config-back-icon" />
          </button>
          <h1>Config</h1>
        </div>
        <OnOffToggleComponent />
      </div>
      <hr />
      <BrightnessSliderComponent />
      <SpeedToggleComponent />
    </div>
  )
}
