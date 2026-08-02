import { useEffect, useState } from 'react'
import { site } from '../content'
import Logo from './Logo'
import { useJoin } from './JoinContext'

export default function Nav() {
  const [pinned, setPinned] = useState(false)
  const { openJoin } = useJoin()

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
            <Logo />
            <div className="nav__status" aria-label="8 קמפיינים פתוחים">
              <span className="nav__status-divider" aria-hidden="true" />
              <span className="nav__status-dot" aria-hidden="true" />
              <span className="nav__status-text">8 קמפיינים פתוחים</span>
            </div>
          </div>

          <nav className="nav__links">
            <a href="#followers">בלי עוקבים</a>
            <a href="#how">איך זה עובד</a>
            <a href="#money">כמה מרוויחים</a>
            <a href="#community">הקהילה</a>
          </nav>

          <button className="btn btn--primary btn--sm nav__cta" type="button" onClick={openJoin}>
            {site.ctaNavLabel}
          </button>
        </div>
      </div>
    </header>
  )
}
