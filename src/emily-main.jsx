import React from 'react'
import { createRoot } from 'react-dom/client'
import EmilyApp from './EmilyApp'
import './index.css'
import './emily/emily.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmilyApp />
  </React.StrictMode>,
)
