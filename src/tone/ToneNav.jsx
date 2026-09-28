import logo from '../assets/logo.png'
import { toneSite } from './content'
import { handleSectionClick } from '../emily/scrollToSection'

export default function ToneNav() {
  return (
    <header className="nav emily-nav">
      <div className="wrap">
        <div className="nav__pill emily-nav__pill">
          <a className="emily-nav__brand" href="#top" onClick={(event) => handleSectionClick(event, 'top')}>
            <img src={logo} alt="Maker" className="emily-nav__logo" />
            <span className="emily-nav__name tone-nav__name">tone.</span>
            <span className="emily-nav__spots">
              <span className="emily-nav__dot" aria-hidden="true" />
              {toneSite.poolSize} מקומות
            </span>
          </a>

          <nav className="nav__links emily-nav__links">
            <a href="#product" onClick={(event) => handleSectionClick(event, 'product')}>
              מה מצלמים
            </a>
            <a href="#how" onClick={(event) => handleSectionClick(event, 'how')}>
              איך זה עובד
            </a>
            <a href="#join" onClick={(event) => handleSectionClick(event, 'join')}>
              הרשמה
            </a>
          </nav>

          <a
            className="btn btn--primary emily-nav__cta"
            href="#join"
            onClick={(event) => handleSectionClick(event, 'join')}
          >
            {toneSite.ctaNavLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
