import Logo from '../components/Logo'
import { emilySite } from './content'

export default function EmilyFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <Logo href={emilySite.creatorsUrl} />

        <div className="footer__links">
          <a href="#product">מה מצלמים</a>
          <a href="#join">הרשמה לפול</a>
          <a href={emilySite.creatorsUrl}>כל הקמפיינים</a>
          <a href={emilySite.productUrl} target="_blank" rel="noreferrer">
            האתר של אמילי
          </a>
        </div>

        <span>© {new Date().getFullYear()} Maker — קמפיין אמילי</span>
      </div>
    </footer>
  )
}
