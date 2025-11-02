import './App.css'
import {
  BrightnessSliderComponent,
  SpeedToggleComponent,
  VerticalToggleComponent,
} from './components'

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>Bishop Rock Lighthouse</h1>
        </div>
        <VerticalToggleComponent />
      </div>
      <hr />
      <BrightnessSliderComponent />
      <SpeedToggleComponent />
    </div>
  )
}

export default App
