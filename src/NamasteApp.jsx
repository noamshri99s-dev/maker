import { useEffect } from 'react'
import NamasteNav from './namaste/NamasteNav'
import NamasteHero from './namaste/NamasteHero'
import NamasteProduct from './namaste/NamasteProduct'
import NamasteSignup from './namaste/NamasteSignup'
import NamasteFooter from './namaste/NamasteFooter'
import NamasteDock from './namaste/NamasteDock'
import { scrollToSection } from './namaste/scroll'

export default function NamasteApp() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return undefined
    const timer = window.setTimeout(() => scrollToSection(id), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="nm-frame">
      <NamasteNav />
      <main>
        <NamasteHero />
        <NamasteProduct />
        <NamasteSignup />
      </main>
      <NamasteFooter />
      <NamasteDock />
    </div>
  )
}
