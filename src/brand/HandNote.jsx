import { useRef } from 'react'
import { gsap, useMakerMotion } from './motion'

const ARROW_PATH = 'M10 6 C7 24 20 42 50 52 M42 44.5 L50 52 L39.5 54.5'

export default function HandNote({ text, arrow = 'down-start', color, className = '', style, ...rest }) {
  const root = useRef(null)
  const path = useRef(null)

  useMakerMotion(
    () => {
      const el = path.current
      if (!el) return
      const length = el.getTotalLength()
      gsap.fromTo(
        el,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <span
      ref={root}
      className={`mk-hand mk-hand--${arrow} ${className}`.trim()}
      style={color ? { color, ...style } : style}
      {...rest}
    >
      <span className="mk-hand__text">{text}</span>
      <svg className="mk-hand__arrow" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          ref={path}
          d={ARROW_PATH}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}
