import { useRef, useState } from 'react'
import HandNote from '../brand/HandNote'
import { gsap, useMakerMotion } from '../brand/motion'
import SkyIcon from './SkyIcon'
import { work } from './content'

const TILT = [-4, 3, -2, 4, -3, 2]

/** "https://www.instagram.com/reel/ABC123/?igsh=…" → { kind: 'reel', code: 'ABC123' } */
function parseInstagram(url) {
  const m = /instagram\.com\/(?:[^/]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/.exec(url || '')
  if (!m) return null
  return { kind: m[1] === 'reels' ? 'reel' : m[1], code: m[2] }
}

function InstagramReel({ url, index }) {
  const ig = parseInstagram(url)
  // Load the heavy Instagram iframe only when someone asks for it.
  const [on, setOn] = useState(false)
  if (!ig) return <ReelPlaceholder index={index} broken />

  if (!on) {
    return (
      <button type="button" className="sk-reel__cover" onClick={() => setOn(true)}>
        <span className="sk-reel__play" aria-hidden="true">
          <SkyIcon name="play" size={22} />
        </span>
        <span className="sk-reel__cta">צפייה ברילס</span>
        <span className="sk-reel__ig">
          <SkyIcon name="instagram" size={14} /> Instagram
        </span>
      </button>
    )
  }
  return (
    <iframe
      className="sk-reel__frame"
      src={`https://www.instagram.com/${ig.kind}/${ig.code}/embed/`}
      title={`רילס ${index + 1} מתוך העבודות של Maker`}
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      scrolling="no"
    />
  )
}

function OwnVideo({ src, poster, label }) {
  return (
    <video className="sk-reel__video" src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={label || 'סרטון UGC'} />
  )
}

function ReelPlaceholder({ index, broken }) {
  return (
    <div className="sk-reel__empty">
      <span className="sk-reel__num" dir="ltr">
        0{index + 1}
      </span>
      <SkyIcon name="instagram" size={28} />
      <b>{broken ? 'הקישור לא תקין' : 'כאן ייכנס רילס'}</b>
      <small>
        מוסיפים קישור ב־<code dir="ltr">src/sky/content.js</code>
      </small>
    </div>
  )
}

export default function SkyWork() {
  const root = useRef(null)

  useMakerMotion(
    () => {
      gsap.from('.sk-reel__phone', {
        y: 120,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-work__row', start: 'top 85%', once: true },
      })
      const words = gsap.utils.toArray('.sk-work__title .w', root.current)
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.sk-work__title', start: 'top 85%', end: 'top 45%', scrub: true } },
      )
    },
    { scope: root },
  )

  return (
    <section className="sk-work" id="work" ref={root}>
      <h2 className="sk-work__title">
        {work.title.map((line, li) => (
          <span key={line} className={`sk-work__line ${li === 1 ? 'is-accent' : ''}`}>
            {line.split(' ').map((w, i) => (
              <span className="w" key={i}>
                {w}{' '}
              </span>
            ))}
          </span>
        ))}
      </h2>
      <div className="sk-work__intro">
        <p>{work.text}</p>
        <HandNote text={work.note} arrow="down-start" className="sk-work__note" />
      </div>

      <ul className="sk-work__row">
        {work.reels.map((r, i) => (
          <li className="sk-reel" key={i} style={{ '--tilt': `${TILT[i % TILT.length]}deg` }}>
            <div className="sk-reel__phone">
              {r.video ? (
                <OwnVideo src={r.video} poster={r.poster} label={r.label} />
              ) : r.instagram ? (
                <InstagramReel url={r.instagram} index={i} />
              ) : (
                <ReelPlaceholder index={i} />
              )}
            </div>
            {r.label ? <span className="sk-reel__label">{r.label}</span> : null}
          </li>
        ))}
      </ul>

      {work.profileUrl ? (
        <div className="sk-work__more">
          <a className="sk-work__profile" href={work.profileUrl} target="_blank" rel="noreferrer">
            <SkyIcon name="instagram" size={18} />
            {work.profileLabel}
          </a>
        </div>
      ) : null}
    </section>
  )
}
