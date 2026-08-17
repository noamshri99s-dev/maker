import { useEffect } from 'react'
import EmilyNav from './emily/EmilyNav'
import EmilyHero from './emily/EmilyHero'
import EmilyProduct from './emily/EmilyProduct'
import EmilySignup from './emily/EmilySignup'
import EmilyFooter from './emily/EmilyFooter'
import EmilyDock from './emily/EmilyDock'
import { scrollToSection } from './emily/scrollToSection'

export default function EmilyApp() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return undefined
    const timer = window.setTimeout(() => scrollToSection(id), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <EmilyNav />
      <main>
        <EmilyHero />
        <EmilyProduct />
        <EmilySignup />
      </main>
      <EmilyFooter />
      <EmilyDock />
    </>
  )
}
