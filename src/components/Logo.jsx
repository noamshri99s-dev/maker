import logo from '../assets/logo.png'
import { site } from '../content'

export default function Logo({ tag, href = '#top' }) {
  return (
    <a href={href} className="logo">
      <img src={logo} alt={site.brand} className="logo__img" />
      <span className="logo__wordmark" aria-hidden="true">
        {site.brand}
      </span>
      {tag ? <span className="logo__tag">{tag}</span> : null}
    </a>
  )
}
