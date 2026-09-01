import BizNav from './business/BizNav'
import BizHero from './business/BizHero'
import BizNumbers from './business/BizNumbers'
import BizNetwork from './business/BizNetwork'
import BizStory from './business/BizStory'
import BizProof from './business/BizProof'
import BizHowItWorks from './business/BizHowItWorks'
import BizMarquee from './business/BizMarquee'
import BizWhy from './business/BizWhy'
import BizUseCases from './business/BizUseCases'
import BizBudget from './business/BizBudget'
import BizFaq from './business/BizFaq'
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
        <BizNumbers />
        <BizNetwork />
        <BizStory />
        <BizProof />
        <BizHowItWorks />
        <BizMarquee />
        <BizWhy />
        <BizUseCases />
        <BizBudget />
        <BizFaq />
        <BizFinalCta />
      </main>
      <BizFooter />
      <BizWizard />
    </LeadProvider>
  )
}
