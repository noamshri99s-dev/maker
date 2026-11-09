import MakerMark from '../brand/MakerMark'
import { handleSectionClick } from './scroll'

const links = [
  { label: 'מה מצלמים', href: 'product' },
  { label: 'איך זה עובד', href: 'how' },
  { label: 'מועמדות', href: 'join' },
]

export default function NamasteFooter() {
  return (
    <footer className="nm-footer">
      <a className="nm-footer__brand" href="#top" onClick={(event) => handleSectionClick(event, 'top')}>
        <MakerMark size={26} color="var(--mk-ink)" dotColor="var(--mk-signal)" strokeWidth={20} />
        <span dir="ltr">maker</span>
      </a>
      <nav className="nm-footer__links" aria-label="קישורים">
        {links.map((link) => (
          <a key={link.href} href={`#${link.href}`} onClick={(event) => handleSectionClick(event, link.href)}>
            {link.label}
          </a>
        ))}
      </nav>
      <small>
        © {new Date().getFullYear()} <span dir="ltr">Maker</span> · קמפיין נמסטה
      </small>
    </footer>
  )
}
