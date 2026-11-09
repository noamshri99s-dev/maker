import { useEffect, useState } from 'react'
import PillButton from '../brand/PillButton'
import { namasteSite } from './content'
import { handleSectionClick } from './scroll'

export default function NamasteDock() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const form = document.querySelector('.nm-form')
    if (!form) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`nm-dock ${hidden ? 'is-hidden' : ''}`}>
      <PillButton href="#join" className="nm-dock__btn" onClick={(event) => handleSectionClick(event, 'join')}>
        {namasteSite.ctaLabel}
      </PillButton>
    </div>
  )
}
