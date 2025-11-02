import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ConfigPage from './pages/config/ConfigPage'
import HomePage from './pages/home/HomePage'

export default function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onSettingsClick={() => navigate('/config')} />}
      />
      <Route
        path="/config"
        element={<ConfigPage onBackClick={() => navigate('/')} />}
      />
    </Routes>
  )
}
