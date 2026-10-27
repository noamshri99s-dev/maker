import { useRef } from 'react'
import { gsap, useMakerMotion } from '../brand/motion'
import { band } from './content'

const ARC = 'M-160 400 Q720 -40 1600 400'

export default function SkyArc() {
  const root = useRef(null)
  const text = band.repeat(6)

  useMakerMotion(
    () => {
      const tp = root.current.querySelector('textPath')
      const state = { o: 0 }
      gsap.to(state, {
        o: -38,
        ease: 'none',
        onUpdate: () => tp.setAttribute('startOffset', `${state.o}%`),
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    },
    { scope: root },
  )

  return (
    <div className="sk-arc" ref={root}>
      <p className="sr-only">{band}</p>
      <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d="M-160 420 L-160 400 Q720 -40 1600 400 L1600 420 Z" fill="var(--mk-mist)" />
        <path id="sk-arc-path" d={ARC} fill="none" stroke="var(--mk-ink)" strokeWidth="112" />
        <text className="sk-arc__text" dominantBaseline="central">
          <textPath href="#sk-arc-path" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
