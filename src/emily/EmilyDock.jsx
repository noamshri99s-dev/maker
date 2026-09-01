import { useEffect, useState } from 'react'
import { emilySite } from './content'
import { handleSectionClick } from './scrollToSection'
import { Icon } from '../components/Icons'

export default function EmilyDock() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const form = document.querySelector('.emily-form')
    if (!form) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`emily-dock ${hidden ? 'is-hidden' : ''}`}>
      <a
        className="btn btn--primary emily-dock__btn"
        href="#join"
        onClick={(event) => handleSectionClick(event, 'join')}
      >
        {emilySite.ctaLabel}
        <span className="btn__arrow">
          <Icon name="arrow" size={18} />
        </span>
      </a>
    </div>
  )
}
