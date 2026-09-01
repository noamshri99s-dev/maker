import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icons'
import { bizStory } from './content'

function StoryVisual({ kind }) {
  if (kind === 'budget') {
    return (
      <div className="story-card story-card--budget">
        <div className="story-card__head">
          <span>תקציב הקמפיין</span>
          <em>פּוּל פעיל</em>
        </div>
        <div className="story-budget__amount">
          ₪ <b>—</b>
        </div>
        <div className="story-budget__bar">
          <span />
        </div>
        <div className="story-budget__row">
          <span>נכנס לפּוּל</span>
          <span>אתה קובע את הסכום</span>
        </div>
      </div>
    )
  }

  if (kind === 'creators') {
    return (
      <div className="story-card story-card--creators">
        <div className="story-card__head">
          <span>יוצרים מצלמים</span>
          <em className="story-live">לייב</em>
        </div>
        <div className="story-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <span className="story-grid__tile" key={i} style={{ animationDelay: `${i * 90}ms` }}>
              <Icon name="camera" size={18} />
            </span>
          ))}
        </div>
        <div className="story-budget__row">
          <span>סרטונים נכנסים</span>
          <span>כל אחד בסגנון שלו</span>
        </div>
      </div>
    )
  }

  if (kind === 'approve') {
    return (
      <div className="story-card story-card--approve">
        <div className="story-card__head">
          <span>ממתין לאישורך</span>
          <em>3 חדשים</em>
        </div>
        {['וידאו · פתיחת אריזה', 'וידאו · שימוש יומיומי', 'וידאו · המלצה אישית'].map((t, i) => (
          <div className="story-approve__row" key={t} style={{ '--d': `${i * 120}ms` }}>
            <span className="story-approve__ico">
              <Icon name="camera" size={15} />
            </span>
            <b>{t}</b>
            <span className="story-approve__ok">
              <Icon name="smallCheck" size={13} />
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="story-card story-card--views">
      <div className="story-card__head">
        <span>צפיות הקמפיין</span>
        <em className="story-live">נספרות עכשיו</em>
      </div>
      <div className="story-views__count">
        <Icon name="views" size={22} />
        <b>נספרות בזמן אמת</b>
      </div>
      <div className="story-views__bars" aria-hidden="true">
        {[42, 68, 55, 88, 74, 96].map((h, i) => (
          <span key={i} style={{ '--h': `${h}%`, '--d': `${i * 80}ms` }} />
        ))}
      </div>
      <div className="story-budget__row">
        <span>תשלום לפי הנספר</span>
        <span>דוח מסודר בסוף</span>
      </div>
    </div>
  )
}

export default function BizStory() {
  const [active, setActive] = useState(0)
  const chapterRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index)
            setActive(idx)
          }
        })
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    )

    chapterRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section story" id="story">
      <div className="wrap">
        <div className="head center">
          <div className="eyebrow">בלי לגעת</div>
          <h2 className="h2">
            שלושה מהלכים שלך.
            <br />
            <span className="grad">כל השאר קורה לבד.</span>
          </h2>
        </div>

        <div className="story__layout">
          <div className="story__sticky">
            <div className="story__stage">
              {bizStory.map((s, i) => (
                <div
                  className={`story__visual ${active === i ? 'is-active' : ''}`}
                  key={s.visual}
                  aria-hidden={active === i ? 'false' : 'true'}
                >
                  <StoryVisual kind={s.visual} />
                </div>
              ))}
            </div>
            <div className="story__dots" aria-hidden="true">
              {bizStory.map((s, i) => (
                <span className={active === i ? 'is-active' : ''} key={s.visual} />
              ))}
            </div>
          </div>

          <div className="story__steps">
            {bizStory.map((s, i) => (
              <div
                className={`story__chapter ${active === i ? 'is-active' : ''}`}
                key={s.visual}
                data-index={i}
                ref={(el) => (chapterRefs.current[i] = el)}
              >
                <span className="story__tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
