import MakerMark from '../brand/MakerMark'
import { useJoin } from '../components/JoinContext'
import { useLead } from '../business/BizLeadContext'
import { nav } from './content'

export default function SkyFooter() {
  const { openLead } = useLead()
  const { openJoin } = useJoin()
  return (
    <footer className="sk-footer">
      <a className="sk-footer__brand" href="#top" aria-label="Maker — לראש העמוד">
        <MakerMark size={28} color="var(--mk-ink)" dotColor="var(--mk-signal)" strokeWidth={20} />
        <span dir="ltr">maker</span>
      </a>
      <nav className="sk-footer__links" aria-label="קישורים">
        {nav.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <button type="button" onClick={openLead}>
          {nav.cta}
        </button>
        <button type="button" onClick={openJoin}>
          {nav.creators}
        </button>
      </nav>
      <small>
        © {new Date().getFullYear()} <span dir="ltr">Maker</span> · סוכנות UGC
      </small>
    </footer>
  )
}
