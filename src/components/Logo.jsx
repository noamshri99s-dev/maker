import { site } from '../content'
import MakerMark from '../brand/MakerMark'

export default function Logo({ tag, href = '#top' }) {
  return (
    <a href={href} className="logo">
      <MakerMark size={42} className="logo__img" dotColor="var(--mk-signal)" title={site.brand} />
      <span className="logo__wordmark" dir="ltr" aria-hidden="true">
        {site.brand}
      </span>
      {tag ? <span className="logo__tag">{tag}</span> : null}
    </a>
  )
}
