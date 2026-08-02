import Reveal from './Reveal'
import { Icon } from './Icons'
import { site } from '../content'
import { useJoin } from './JoinContext'

const points = ['בלי עוקבים', 'תבנית מוכנה', 'מצלמים בטלפון']

const strip = [
  { title: 'יוצרים', text: 'מצלמים ומרוויחים מהפול' },
  { title: 'קמפיינים', text: 'תבנית מוכנה לכל מוצר' },
  { title: 'נתונים', text: 'תשלום לפי ביצועים' },
  { title: 'ביחד', text: 'רשת אחת, לא לבד' },
]

const campaigns = [
  { name: 'קמפיין סקין-קר', status: 'מאושר להעלאה', tone: 'ok' },
  { name: 'קמפיין אוכל מהיר', status: 'ממתין לאישור', tone: 'wait' },
  { name: 'קמפיין כושר', status: 'נתונים נספרים', tone: 'live' },
]

export default function Hero() {
  const { openJoin } = useJoin()

  return (
    <section className="hero" id="top">
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <div className="hero__glow hero__glow--c" />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <Reveal className="eyebrow" as="div">
            ✦ רשת היוצרים של Maker
          </Reveal>

          <Reveal as="h1" delay={60}>
            לא צריך עוקבים.
            <br />
            <span className="grad">צריך טלפון.</span>
          </Reveal>

          <Reveal className="hero__sub" as="p" delay={120}>
            מצלם סרטון אחד לפי תבנית שאנחנו שולחים, מעלה לחשבון שלך, ומקבל תשלום{' '}
            <strong className="hero__sub-em">לפי הצפיות שהוא עשה</strong>.
          </Reveal>

          <Reveal className="hero__cta" delay={180}>
            <button className="btn btn--primary btn--lg" type="button" onClick={openJoin}>
              {site.ctaLabel}
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </button>
            <a className="btn btn--outline btn--lg" href="#how">
              {site.ctaSecondaryLabel}
            </a>
          </Reveal>

          <Reveal className="hero__note" delay={230}>
            {points.map((p) => (
              <span key={p}>
                <i className="tick">
                  <Icon name="smallCheck" size={12} />
                </i>
                {p}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="hero__visual" delay={160}>
          <div className="hero-float hero-float--a">
            <span className="hero-float__ico">
              <Icon name="users" size={16} />
            </span>
            <div>
              <strong>יוצרים חדשים הצטרפו</strong>
              <small>12 השבוע</small>
            </div>
          </div>

          <div className="hero-board" aria-hidden="true">
            <div className="hero-board__head">
              <div>
                <strong>לוח הקמפיינים</strong>
                <span>פול פעיל · Maker</span>
              </div>
              <em>לייב</em>
            </div>

            <div className="hero-board__stats">
              <div>
                <b>24</b>
                <span>יוצרים פעילים</span>
              </div>
              <div>
                <b>8</b>
                <span>קמפיינים</span>
              </div>
              <div>
                <b>₪</b>
                <span>בפול מחכה</span>
              </div>
            </div>

            <div className="hero-board__list">
              {campaigns.map((item) => (
                <div className="hero-board__row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span className={`hero-board__tag hero-board__tag--${item.tone}`}>
                      {item.status}
                    </span>
                  </div>
                  <Icon name="arrow" size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-float hero-float--b">
            <span className="hero-float__ico hero-float__ico--pay">
              <Icon name="money" size={16} />
            </span>
            <div>
              <strong>תשלום יצא מהפול</strong>
              <small>סרטון אושר · נתונים נכנסו</small>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="hero-strip">
        <div className="wrap hero-strip__inner">
          {strip.map((item) => (
            <div className="hero-strip__item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
