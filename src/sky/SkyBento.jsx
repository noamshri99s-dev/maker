import { useRef } from 'react'
import MakerMark from '../brand/MakerMark'
import { gsap, useMakerMotion } from '../brand/motion'
import { withLtr } from '../brand/Ltr'
import SkyIcon from './SkyIcon'
import { bento } from './content'

export default function SkyBento() {
  const root = useRef(null)

  useMakerMotion(
    () => {
      gsap.from('.sk-tile', {
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-bento__grid', start: 'top 80%', once: true },
      })
      gsap.from('.sk-bento__title > span', {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      })
      gsap.from('.sk-zero__num', {
        scale: 0.6,
        autoAlpha: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: { trigger: '.sk-zero', start: 'top 75%', once: true },
      })
    },
    { scope: root },
  )

  const { big, pay, picked, reel, brief, team } = bento

  return (
    <section className="sk-bento" id="why" ref={root}>
      <h2 className="sk-bento__title">
        <span>{bento.title[0]}</span>
        <span className="is-accent">{withLtr(bento.title[1])}</span>
      </h2>

      <div className="sk-bento__grid">
        <article className="sk-tile sk-zero">
          <span className="sk-zero__num" dir="ltr" aria-hidden="true">
            {big.value}
          </span>
          <div className="sk-tile__body">
            <h3>{big.title}</h3>
            <p>{big.text}</p>
          </div>
          <span className="sk-chip sk-chip--ok">
            <SkyIcon name="check" size={13} stroke={3} />
            {big.chip}
          </span>
        </article>

        <article className="sk-tile sk-pay">
          <div className="sk-mini sk-mini--pay" aria-hidden="true">
            <span className="sk-mini__ico">
              <SkyIcon name="money" size={18} />
            </span>
            <span className="sk-mini__txt">
              <b>{pay.row}</b>
              <small>{pay.meta}</small>
            </span>
            <span className="sk-chip sk-chip--ok sk-chip--sm">{pay.status}</span>
          </div>
          <div className="sk-tile__body">
            <h3>{pay.title}</h3>
            <p>{pay.text}</p>
          </div>
        </article>

        <article className="sk-tile sk-picked">
          <div className="sk-mini sk-mini--faces" aria-hidden="true">
            {['ש', 'מ', 'נ', 'ד'].map((l, i) => (
              <span key={l} className={`sk-face ${i === 2 ? 'is-picked' : ''}`}>
                {l}
                {i === 2 ? <em>{picked.tag}</em> : null}
              </span>
            ))}
          </div>
          <div className="sk-tile__body">
            <h3>{picked.title}</h3>
            <p>{picked.text}</p>
          </div>
        </article>

        <article className="sk-tile sk-course">
          <div className="sk-mini sk-mini--video" aria-hidden="true">
            <span className="sk-video">
              <span className="sk-video__play">
                <SkyIcon name="play" size={16} />
              </span>
              <span className="sk-video__bar">
                <i />
              </span>
            </span>
            <small>{reel.lesson}</small>
          </div>
          <div className="sk-tile__body">
            <h3>{reel.title}</h3>
            <p>{reel.text}</p>
          </div>
        </article>

        <article className="sk-tile sk-brieftile">
          <ol className="sk-mini sk-mini--list" aria-hidden="true">
            <li>
              <i>1</i>פתיח שעוצר גלילה
            </li>
            <li>
              <i>2</i>המוצר בפעולה
            </li>
            <li>
              <i>3</i>קריאה לפעולה
            </li>
          </ol>
          <div className="sk-tile__body">
            <h3>{brief.title}</h3>
            <p>{brief.text}</p>
          </div>
        </article>

        <article className="sk-tile sk-team">
          <div className="sk-team__mark" aria-hidden="true">
            <MakerMark size={64} variant="tile" glow />
          </div>
          <div className="sk-tile__body">
            <h3>{team.title}</h3>
            <p>{withLtr(team.text)}</p>
          </div>
          <span className="sk-chip sk-chip--sky">
            <SkyIcon name="check" size={13} stroke={3} />
            {team.chip}
          </span>
        </article>
      </div>
    </section>
  )
}
