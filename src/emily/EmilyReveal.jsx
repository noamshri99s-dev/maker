import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function EmilyReveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  y = 26,
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return undefined

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(el, {
          y,
          autoAlpha: 0,
          duration: 0.7,
          delay: delay / 1000,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      return () => mm.revert()
    },
    { dependencies: [delay, y] },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
