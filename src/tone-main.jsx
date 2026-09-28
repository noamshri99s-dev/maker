import React from 'react'
import { createRoot } from 'react-dom/client'
import ToneApp from './ToneApp'
import './index.css'
import './emily/emily.css'
import './tone/tone.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToneApp />
  </React.StrictMode>,
)
