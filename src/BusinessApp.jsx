import BizNav from './business/BizNav'
import BizHero from './business/BizHero'
import BizNetwork from './business/BizNetwork'
import BizProof from './business/BizProof'
import BizHowItWorks from './business/BizHowItWorks'
import BizMarquee from './business/BizMarquee'
import BizWhy from './business/BizWhy'
import BizBudget from './business/BizBudget'
import BizFinalCta from './business/BizFinalCta'
import BizFooter from './business/BizFooter'
import BizWizard from './business/BizWizard'
import { LeadProvider } from './business/BizLeadContext'

export default function BusinessApp() {
  return (
    <LeadProvider>
      <BizNav />
      <main>
        <BizHero />
        <BizNetwork />
        <BizProof />
        <BizHowItWorks />
        <BizMarquee />
        <BizWhy />
        <BizBudget />
        <BizFinalCta />
      </main>
      <BizFooter />
      <BizWizard />
    </LeadProvider>
  )
}
