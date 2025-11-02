import './App.css'
import {
  BrightnessSliderComponent,
  OnOffToggleComponent,
  SpeedToggleComponent,
} from './components'

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>Bishop Rock Lighthouse</h1>
        </div>
        <OnOffToggleComponent />
      </div>
      <hr />
      <BrightnessSliderComponent />
      <SpeedToggleComponent />
    </div>
  )
}

export default App
