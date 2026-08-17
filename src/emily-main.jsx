import React from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EmilyApp from './EmilyApp'
import './index.css'
import './emily/emily.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmilyApp />
  </React.StrictMode>,
)
