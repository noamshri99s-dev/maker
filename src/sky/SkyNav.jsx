import { useEffect, useState } from 'react'
import MakerMark from '../brand/MakerMark'
import { useJoin } from '../components/JoinContext'
import { useLead } from '../business/BizLeadContext'
import { nav } from './content'

export default function SkyNav() {
  const { openLead } = useLead()
  const { openJoin } = useJoin()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sk-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="sk-nav__bar">
        <a className="sk-nav__brand" href="#top" aria-label="Maker — לראש העמוד">
          <MakerMark size={30} color="#fff" dotColor="var(--mk-signal)" strokeWidth={20} />
          <span className="sk-nav__word" dir="ltr">
            maker
          </span>
        </a>

        <nav className="sk-nav__links" aria-label="ניווט ראשי">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <button type="button" className="sk-nav__biz" onClick={openJoin}>
            {nav.creators}
          </button>
        </nav>

        <div className="sk-nav__end">
          <button type="button" className="sk-nav__cta" onClick={openLead}>
            {nav.cta}
          </button>
          <button
            type="button"
            className="sk-nav__menu"
            aria-expanded={open}
            aria-controls="sk-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">תפריט</span>
            <span aria-hidden="true" className={`sk-burger ${open ? 'is-open' : ''}`}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div id="sk-sheet" className="sk-sheet" hidden={!open}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            openJoin()
          }}
        >
          {nav.creators}
        </button>
      </div>
    </header>
  )
}
