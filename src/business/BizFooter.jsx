import { bizSite } from './content'
import Logo from '../components/Logo'
import { useLead } from './BizLeadContext'

export default function BizFooter() {
  const { openLead } = useLead()

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <Logo tag={bizSite.brandTag} />

        <div className="footer__links">
          <a href="#how">איך זה עובד</a>
          <a href="#budget">איך משלמים</a>
          <a href={bizSite.creatorsUrl}>אני יוצר</a>
          <button type="button" onClick={openLead}>
            {bizSite.ctaLabel}
          </button>
        </div>

        <span>© {new Date().getFullYear()} Maker — לעסקים</span>
      </div>
    </footer>
  )
}
