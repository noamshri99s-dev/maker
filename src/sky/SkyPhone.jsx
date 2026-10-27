import { useRef } from 'react'
import HandNote from '../brand/HandNote'
import StatBubble from '../brand/StatBubble'
import { gsap, useMakerMotion } from '../brand/motion'
import Cloud from './Clouds'
import SkyIcon from './SkyIcon'
import { phone } from './content'

export default function SkyPhone() {
  const root = useRef(null)
  const [before, after] = phone.text.split(phone.underline)

  useMakerMotion(
    () => {
      const st = { trigger: root.current, start: 'top 70%', once: true }
      const ring = root.current.querySelector('.sk-ring circle')
      const len = ring.getTotalLength()
      gsap.fromTo(ring, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: st })
      gsap.from('.sk-phone', { y: 90, autoAlpha: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.sk-phone-sec .mk-stat', { scale: 0.5, autoAlpha: 0, duration: 0.6, stagger: 0.12, delay: 0.5, ease: 'back.out(1.7)', scrollTrigger: st })
      gsap.from('.sk-phone-sec__title > span', { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: st })
      gsap.fromTo('.sk-phone', { rotate: -10 }, {
        rotate: 6,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      const u = root.current.querySelector('.sk-squiggle path')
      const ul = u.getTotalLength()
      gsap.fromTo(u, { strokeDasharray: ul, strokeDashoffset: ul }, { strokeDashoffset: 0, duration: 0.8, delay: 0.9, scrollTrigger: st })
    },
    { scope: root },
  )

  return (
    <section className="sk-phone-sec" id="ugc" ref={root}>
      <Cloud kind="c" depth={0.3} className="sk-phone-sec__cloud" />

      <div className="sk-phone-sec__copy">
        <h2 className="sk-phone-sec__title">
          {phone.lines.map((l, i) => (
            <span key={l} className={i === 0 ? 'is-light' : ''}>
              {l}
            </span>
          ))}
        </h2>
        <p className="sk-phone-sec__text">
          {before}
          <span className="sk-under">
            {phone.underline}
            <svg className="sk-squiggle" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 9 C 30 2, 50 13, 80 7 S 140 3, 198 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          {after}
        </p>
      </div>

      <div className="sk-phone-sec__visual">
        <svg className="sk-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeWidth="1.6" />
        </svg>

        <div className="sk-phone" aria-label="דוגמה לבריף של קמפיין" role="img">
          <div className="sk-phone__screen">
            <div className="sk-phone__top">
              <span className="sk-phone__rec">
                <i /> <span dir="ltr">REC</span>
              </span>
              <span className="sk-phone__time" dir="ltr">
                9:41
              </span>
            </div>
            <div className="sk-brief">
              <small>בריף · {phone.brief.campaign}</small>
              <div className="sk-brief__product" aria-hidden="true">
                <span className="sk-bottle" />
              </div>
              <span className="sk-brief__label">פתיח</span>
              <p className="sk-brief__hook">{phone.brief.hook}</p>
              <ul>
                {phone.brief.checklist.map((c) => (
                  <li key={c}>
                    <SkyIcon name="check" size={12} stroke={3} />
                    {c}
                  </li>
                ))}
              </ul>
              <span className="sk-brief__btn">
                <i />
                {phone.brief.rec}
              </span>
            </div>
          </div>
        </div>

        <div className="sk-bubbles">
          {phone.bubbles.map((b, i) => (
            <StatBubble key={b.label} value={b.value} label={b.label} className={`sk-bubble sk-bubble--${i + 1}`} />
          ))}
        </div>

        <HandNote text={phone.note} arrow="down-end" className="sk-phone-sec__note" />
      </div>
    </section>
  )
}
