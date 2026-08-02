import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import NoFollowers from './components/NoFollowers'
import HowItWorks from './components/HowItWorks'
import Earnings from './components/Earnings'
import Community from './components/Community'
import SocialProof from './components/SocialProof'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import JoinWizard from './components/JoinWizard'
import { JoinProvider } from './components/JoinContext'

export default function App() {
  return (
    <JoinProvider>
      <Nav />
      <main>
        <Hero />
        <Community />
        <SocialProof />
        <HowItWorks />
        <Marquee />
        <NoFollowers />
        <Earnings />
        <FinalCta />
      </main>
      <Footer />
      <JoinWizard />
    </JoinProvider>
  )
}
