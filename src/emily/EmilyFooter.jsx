import { emilySite } from './content'
import { handleSectionClick } from './scrollToSection'
import logo from '../assets/logo.png'

export default function EmilyFooter() {
  return (
    <footer className="footer emily-footer">
      <div className="wrap footer__inner">
        <a href="#top" className="logo" onClick={(event) => handleSectionClick(event, 'top')}>
          <img src={logo} alt="Maker" className="logo__img" />
        </a>

        <div className="footer__links">
          <a href="#product" onClick={(event) => handleSectionClick(event, 'product')}>
            מה מצלמים
          </a>
          <a href="#join" onClick={(event) => handleSectionClick(event, 'join')}>
            הרשמה לפול
          </a>
          <a href={emilySite.productUrl} target="_blank" rel="noreferrer">
            האתר של אמילי
          </a>
        </div>

        <span>© {new Date().getFullYear()} Maker — קמפיין אמילי</span>
      </div>
    </footer>
  )
}
