import { site } from '../content'
import Logo from './Logo'
import { useJoin } from './JoinContext'

export default function Footer() {
  const { openJoin } = useJoin()

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <Logo />

        <div className="footer__links">
          <a href="#how">איך זה עובד</a>
          <a href="#money">כמה מרוויחים</a>
          <a href={site.emilyUrl}>קמפיין אמילי</a>
          <a href={site.businessUrl}>אני עסק</a>
          <button type="button" onClick={openJoin}>
            {site.ctaLabel}
          </button>
        </div>

        <span>© {new Date().getFullYear()} Maker — רשת היוצרים</span>
      </div>
    </footer>
  )
}
