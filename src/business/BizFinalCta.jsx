import Reveal from '../components/Reveal'
import { Icon } from '../components/Icons'
import { bizSite } from './content'
import { useLead } from './BizLeadContext'

export default function BizFinalCta() {
  const { openLead } = useLead()

  return (
    <section className="cta" id="brief">
      <div className="wrap">
        <Reveal className="cta__box">
          <div className="cta__blob cta__blob--a" />
          <div className="cta__blob cta__blob--b" />

          <div className="cta__eyebrow">פתיחת קמפיין</div>

          <h2>
            רוצה שרשת שלמה
            <br />
            תצלם את המוצר שלך?
          </h2>
          <p>
            מלא בריף קצר בכמה שלבים — נחזור אליך עם הצעה לקמפיין: כמה יוצרים, איזה תקציב, ומתי
            הסרטונים באוויר.
          </p>

          <div className="cta__actions">
            <button className="btn btn--light btn--lg" type="button" onClick={openLead}>
              {bizSite.ctaLabel}
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </button>
            <span className="cta__meta">
              כ־2 דקות · בלי התחייבות · עד {bizSite.numbers.launchDays} ימים לאוויר
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
