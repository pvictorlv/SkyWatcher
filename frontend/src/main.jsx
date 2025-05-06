import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StarBackground from './components/StarBackground'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarBackground />
    <App />
  </StrictMode>,
)
