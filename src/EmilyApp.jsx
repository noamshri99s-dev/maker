import EmilyNav from './emily/EmilyNav'
import EmilyHero from './emily/EmilyHero'
import EmilyProduct from './emily/EmilyProduct'
import EmilySignup from './emily/EmilySignup'
import EmilyFooter from './emily/EmilyFooter'

export default function EmilyApp() {
  return (
    <>
      <EmilyNav />
      <main>
        <EmilyHero />
        <EmilyProduct />
        <EmilySignup />
      </main>
      <EmilyFooter />
    </>
  )
}
