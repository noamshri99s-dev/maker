import logo from '../assets/logo.png'
import { emilySite } from './content'
import { handleSectionClick } from './scrollToSection'

export default function EmilyNav() {
  return (
    <header className="nav emily-nav">
      <div className="wrap">
        <div className="nav__pill emily-nav__pill">
          <a className="emily-nav__brand" href="#top" onClick={(event) => handleSectionClick(event, 'top')}>
            <img src={logo} alt="Maker" className="emily-nav__logo" />
            <span className="emily-nav__name">אמילי</span>
            <span className="emily-nav__spots">
              <span className="emily-nav__dot" aria-hidden="true" />
              {emilySite.poolSize} מקומות
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
            נרשמים
          </a>
        </div>
      </div>
    </header>
  )
}
