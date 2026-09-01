import Reveal from '../components/Reveal'
import { Icon } from '../components/Icons'
import { bizUseCases } from './content'
import { useLead } from './BizLeadContext'

export default function BizUseCases() {
  const { openLead } = useLead()

  return (
    <section className="section usecases" id="usecases">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            למי זה מתאים
          </Reveal>
          <Reveal as="h2" className="h2">
            אם יש לך מוצר להראות —
            <br />
            <span className="grad">יש לך קמפיין.</span>
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            הפורמט עובד בכל תחום שבו וידאו קצר מוכר. אלה כמה מהעולמות שהכי מתאימים לרשת יוצרים.
          </Reveal>
        </div>

        <div className="usecases__grid">
          {bizUseCases.map((u, i) => (
            <Reveal className="usecase" key={u.title} delay={(i % 3) * 70}>
              <span className="usecase__ico">
                <Icon name={u.icon} size={22} />
              </span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
              <span className="usecase__glow" aria-hidden="true" />
            </Reveal>
          ))}
        </div>

        <Reveal className="usecases__foot" delay={120}>
          <span>לא בטוח שהתחום שלך ברשימה?</span>
          <button type="button" className="link-cta" onClick={openLead}>
            ספר לנו על המוצר
            <Icon name="arrow" size={16} />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
