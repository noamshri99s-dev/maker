import React from 'react'
import { createRoot } from 'react-dom/client'
import BusinessApp from './BusinessApp'
import './index.css'

document.body.classList.add('theme-biz')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BusinessApp />
  </React.StrictMode>,
)
