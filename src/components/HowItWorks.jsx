import Reveal from './Reveal'
import { Icon } from './Icons'
import { steps } from '../content'

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            איך זה עובד
          </Reveal>
          <Reveal as="h2" className="h2">
            מהתקציב של העסק
            <br />
            עד הכסף אצלך
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            שבעה שלבים. זה כל המסלול.
          </Reveal>
        </div>

        <Reveal className="pool-flow" delay={90}>
          <div className="pool-flow__biz">
            <span className="pool-flow__biz-ico">
              <Icon name="money" size={22} />
            </span>
            <div>
              <strong>עסק משלם</strong>
              <span>מכניס תקציב לקמפיין</span>
            </div>
          </div>

          <div className="pool-flow__arrow" aria-hidden="true">
            <Icon name="arrow" size={22} />
          </div>

          <div className="pool-flow__pool">
            <strong>הפּוּל</strong>
            <span>תקציב משותף לקמפיין</span>
          </div>

          <div className="pool-flow__arrow" aria-hidden="true">
            <Icon name="arrow" size={22} />
          </div>

          <div className="pool-flow__col">
            <div className="pool-flow__avatars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span className="pool-flow__avatar" key={i}>
                  <Icon name="users" size={18} />
                </span>
              ))}
            </div>
            <strong>יוצרים</strong>
            <span>מרוויחים לפי נתונים</span>
          </div>
        </Reveal>

        <Reveal className="rail" delay={60}>
          <div className="rail__scroll">
            <div className="rail__track">
              {steps.map((s, i) => (
                <div className="rail__item" key={s.n}>
                  <div className="rail__node">
                    <span className="rail__num">{s.n}</span>
                    <Icon name={s.icon} size={30} />
                  </div>
                  <div className="rail__label">{s.title}</div>
                  {i < steps.length - 1 && <span className="rail__connector" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
          <p className="rail__hint">גלול לצדדים לכל השלבים ←</p>
        </Reveal>

        <Reveal className="flow__gate" delay={80}>
          <span className="flow__icon">
            <Icon name="shield" size={22} />
          </span>
          סרטון לא עולה לרשתות בלי אישור של הצוות.
        </Reveal>
      </div>
    </section>
  )
}
