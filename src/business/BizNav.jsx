import { useEffect, useState } from 'react'
import { bizSite } from './content'
import Logo from '../components/Logo'
import { useLead } from './BizLeadContext'

export default function BizNav() {
  const [pinned, setPinned] = useState(false)
  const [progress, setProgress] = useState(0)
  const { openLead } = useLead()

  useEffect(() => {
    const onScroll = () => {
      setPinned(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className={`nav ${pinned ? 'nav--pinned' : ''}`}>
      <div
        className="nav__progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />
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
            <a href="#faq">שאלות</a>
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
