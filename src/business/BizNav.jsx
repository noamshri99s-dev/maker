import { useEffect, useState } from 'react'
import { bizSite } from './content'
import Logo from '../components/Logo'
import { useLead } from './BizLeadContext'

export default function BizNav() {
  const [pinned, setPinned] = useState(false)
  const { openLead } = useLead()

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${pinned ? 'nav--pinned' : ''}`}>
      <div className="wrap">
        <div className="nav__pill">
          <div className="nav__brand">
            <Logo tag={bizSite.brandTag} />
            <div
              className="nav__status"
              aria-label={`${bizSite.numbers.creatorsInNetwork} יוצרים ברשת`}
            >
              <span className="nav__status-divider" aria-hidden="true" />
              <span className="nav__status-dot" aria-hidden="true" />
              <span className="nav__status-text">
                {bizSite.numbers.creatorsInNetwork} יוצרים ברשת
              </span>
            </div>
          </div>

          <nav className="nav__links">
            <a href="#why">למה לא משפיען</a>
            <a href="#how">איך זה עובד</a>
            <a href="#budget">איך משלמים</a>
            <a href="#network">הרשת</a>
            <a className="nav__switch" href={bizSite.creatorsUrl}>
              אני יוצר
            </a>
          </nav>

          <button className="btn btn--primary btn--sm nav__cta" type="button" onClick={openLead}>
            {bizSite.ctaNavLabel}
          </button>
        </div>
      </div>
    </header>
  )
}
