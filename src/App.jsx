import JoinWizard from './components/JoinWizard'
import { JoinProvider } from './components/JoinContext'
import { LeadProvider } from './business/BizLeadContext'
import SkyNav from './sky/SkyNav'
import SkyHero from './sky/SkyHero'
import SkyPhone from './sky/SkyPhone'
import SkyArc from './sky/SkyArc'
import SkyBento from './sky/SkyBento'
import SkyHow from './sky/SkyHow'
import SkyWork from './sky/SkyWork'
import SkyFinal from './sky/SkyFinal'
import SkyFooter from './sky/SkyFooter'
import SkyBrief from './sky/SkyBrief'
import './sky/sky.css'
import './sky/brief.css'

/**
 * Home page — for business owners.
 * Main CTA opens the brief form (SkyBrief, Web3Forms);
 * "אני יוצר/ת" opens the creators sign-up (JoinWizard).
 */
export default function App() {
  return (
    <LeadProvider>
      <JoinProvider>
        <div className="mk-frame">
          <SkyNav />
          <main>
            <div className="sk-skytop">
              <SkyHero />
              <SkyPhone />
              <SkyArc />
            </div>
            <SkyBento />
            <SkyHow />
            <SkyWork />
            <SkyFinal />
          </main>
          <SkyFooter />
        </div>
        <SkyBrief />
        <JoinWizard />
      </JoinProvider>
    </LeadProvider>
  )
}
