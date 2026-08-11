import Reveal from '../components/Reveal'
import { Icon } from '../components/Icons'
import { bizSteps, bizSite } from './content'

export default function BizHowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            איך זה עובד
          </Reveal>
          <Reveal as="h2" className="h2">
            מהתקציב שלך
            <br />
            עד הצפיות בדוח
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            שבעה שלבים, ואתה מעורב רק בשלושה מהם. עד {bizSite.numbers.launchDays} ימים מהבריף
            הראשונים לסרטונים באוויר.
          </Reveal>
        </div>

        <Reveal className="pool-flow" delay={90}>
          <div className="pool-flow__biz">
            <span className="pool-flow__biz-ico">
              <Icon name="money" size={22} />
            </span>
            <div>
              <strong>אתה מכניס תקציב</strong>
              <span>סכום שאתה מחליט עליו</span>
            </div>
          </div>

          <div className="pool-flow__arrow" aria-hidden="true">
            <Icon name="arrow" size={22} />
          </div>

          <div className="pool-flow__pool">
            <strong>הפּוּל</strong>
            <span>תקציב הקמפיין שלך</span>
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
            <strong>עשרות יוצרים</strong>
            <span>מצלמים ומקבלים לפי צפיות</span>
          </div>
        </Reveal>

        <Reveal className="rail" delay={60}>
          <div className="rail__scroll">
            <div className="rail__track">
              {bizSteps.map((s, i) => (
                <div className="rail__item" key={s.n}>
                  <div className="rail__node">
                    <span className="rail__num">{s.n}</span>
                    <Icon name={s.icon} size={30} />
                  </div>
                  <div className="rail__label">{s.title}</div>
                  {i < bizSteps.length - 1 && (
                    <span className="rail__connector" aria-hidden="true" />
                  )}
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
          אף סרטון לא עולה לרשתות לפני שאתה אישרת אותו.
        </Reveal>
      </div>
    </section>
  )
}
