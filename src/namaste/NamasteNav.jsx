import { useState } from 'react'
import MakerMark from '../brand/MakerMark'
import { namasteSite } from './content'
import { handleSectionClick } from './scroll'

const links = [
  { label: 'מה מצלמים', href: 'product' },
  { label: 'איך זה עובד', href: 'how' },
  { label: 'מועמדות', href: 'join' },
]

export default function NamasteNav() {
  const [open, setOpen] = useState(false)

  const go = (event, id) => {
    setOpen(false)
    handleSectionClick(event, id)
  }

  return (
    <header className="nm-nav">
      <div className="nm-nav__bar">
        <a className="nm-nav__brand" href="#top" onClick={(event) => go(event, 'top')}>
          <MakerMark size={28} color="#fff" dotColor="var(--mk-signal)" strokeWidth={20} />
          <span className="nm-nav__word" dir="ltr">
            maker
          </span>
          <span className="nm-nav__tag">{namasteSite.productName}</span>
        </a>

        <nav className="nm-nav__links" aria-label="ניווט">
          {links.map((link) => (
            <a key={link.href} href={`#${link.href}`} onClick={(event) => go(event, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nm-nav__end">
          <span className="nm-nav__spots">
            <i />
            {namasteSite.poolSize} מקומות
          </span>
          <a className="nm-nav__cta" href="#join" onClick={(event) => go(event, 'join')}>
            {namasteSite.ctaNavLabel}
          </a>
          <button
            type="button"
            className="nm-nav__menu"
            aria-expanded={open}
            aria-controls="nm-sheet"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">תפריט</span>
            <span aria-hidden="true" className={`nm-burger ${open ? 'is-open' : ''}`}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div id="nm-sheet" className="nm-sheet" hidden={!open}>
        {links.map((link) => (
          <a key={link.href} href={`#${link.href}`} onClick={(event) => go(event, link.href)}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}
