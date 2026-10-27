import { useRef } from 'react'
import HandNote from '../brand/HandNote'
import { gsap, useMakerMotion } from '../brand/motion'
import SkyIcon from './SkyIcon'
import { how } from './content'

const TILT = [-3, 2, -2, 3, -1.5]

export default function SkyHow() {
  const root = useRef(null)

  useMakerMotion(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const track = root.current.querySelector('.sk-how__track')
        const viewport = root.current.querySelector('.sk-how__viewport')
        const cards = gsap.utils.toArray('.sk-step', root.current)
        const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        const fill = root.current.querySelector('.sk-how__fill')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + dist() * 1.15,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // RTL: content overflows to the left, so the track moves right (+x)
        tl.to(track, { x: () => dist(), ease: 'none' }, 0)
        tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
        cards.forEach((c, i) => {
          tl.from(c, { y: 50, rotate: TILT[i] * 3, ease: 'power2.out', duration: 0.25 }, i * 0.12)
        })
      })
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.sk-step', root.current).forEach((c) => {
          gsap.from(c, { y: 50, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 85%', once: true } })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="sk-how" id="how" ref={root}>
      <div className="sk-how__head">
        <h2>{how.title}</h2>
        <span className="sk-how__progress" aria-hidden="true">
          <i className="sk-how__fill" />
        </span>
      </div>

      <div className="sk-how__viewport">
        <ol className="sk-how__track">
          {how.steps.map((s, i) => (
            <li className="sk-step" key={s.title} style={{ '--tilt': `${TILT[i]}deg` }}>
              <span className="sk-step__badge" aria-hidden="true">
                <SkyIcon name={s.icon} size={26} />
              </span>
              <span className="sk-step__num" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.note ? <HandNote text={s.note} arrow="up" className="sk-step__note" /> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
