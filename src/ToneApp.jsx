import { useEffect } from 'react'
import ToneNav from './tone/ToneNav'
import ToneHero from './tone/ToneHero'
import ToneProduct from './tone/ToneProduct'
import ToneSignup from './tone/ToneSignup'
import ToneFooter from './tone/ToneFooter'
import ToneDock from './tone/ToneDock'
import { scrollToSection } from './emily/scrollToSection'

export default function ToneApp() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return undefined
    const timer = window.setTimeout(() => scrollToSection(id), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <ToneNav />
      <main>
        <ToneHero />
        <ToneProduct />
        <ToneSignup />
      </main>
      <ToneFooter />
      <ToneDock />
    </>
  )
}
