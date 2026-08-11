import Reveal from '../components/Reveal'
import { Icon } from '../components/Icons'
import { bizSite } from './content'
import { useLead } from './BizLeadContext'

const points = ['בלי הפקה', 'בלי משפיענים', 'תשלום לפי צפיות']

const strip = [
  { title: 'אתה', text: 'מכניס תקציב לפּוּל' },
  { title: 'היוצרים', text: 'עשרות מצלמים את המוצר' },
  { title: 'אישור', text: 'כלום לא עולה בלי אישורך' },
  { title: 'צפיות', text: 'משלם לפי מה שנספר' },
]

const board = [
  { name: 'בריף המוצר שלך', status: 'תבנית מאושרת', tone: 'ok' },
  { name: '12 סרטונים חדשים', status: 'ממתינים לאישור שלך', tone: 'wait' },
  { name: 'צפיות הקמפיין', status: 'נספרות בזמן אמת', tone: 'live' },
]

export default function BizHero() {
  const { openLead } = useLead()

  return (
    <section className="hero" id="top">
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <div className="hero__glow hero__glow--c" />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <Reveal className="eyebrow" as="div">
            ✦ Maker לעסקים
          </Reveal>

          <Reveal as="h1" delay={60}>
            לא צריך משפיען.
            <br />
            <span className="grad">צריך המון אנשים.</span>
          </Reveal>

          <Reveal className="hero__sub" as="p" delay={120}>
            עשרות יוצרים אמיתיים מצלמים את המוצר שלך לפי בריף שאנחנו בונים, ואתה משלם{' '}
            <strong className="hero__sub-em">לפי הצפיות שהם הביאו</strong>.
          </Reveal>

          <Reveal className="hero__cta" delay={180}>
            <button className="btn btn--primary btn--lg" type="button" onClick={openLead}>
              {bizSite.ctaLabel}
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </button>
            <a className="btn btn--outline btn--lg" href="#how">
              {bizSite.ctaSecondaryLabel}
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
              <strong>יוצרים נכנסו לקמפיין</strong>
              <small>12 השבוע</small>
            </div>
          </div>

          <div className="hero-board" aria-hidden="true">
            <div className="hero-board__head">
              <div>
                <strong>הקמפיין שלך</strong>
                <span>פּוּל פעיל · Maker</span>
              </div>
              <em>לייב</em>
            </div>

            <div className="hero-board__stats">
              <div>
                <b>{bizSite.numbers.creatorsPerCampaign}</b>
                <span>יוצרים מגויסים</span>
              </div>
              <div>
                <b>18</b>
                <span>סרטונים באוויר</span>
              </div>
              <div>
                <b>₪</b>
                <span>בפּוּל שלך</span>
              </div>
            </div>

            <div className="hero-board__list">
              {board.map((item) => (
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
              <strong>שולם על צפיות שנספרו</strong>
              <small>בלי ריטיינר · בלי הפתעות</small>
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
