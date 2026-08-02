import Reveal from './Reveal'
import { Icon } from './Icons'
import { useJoin } from './JoinContext'

export default function FinalCta() {
  const { openJoin } = useJoin()

  return (
    <section className="cta" id="join">
      <div className="wrap">
        <Reveal className="cta__box">
          <div className="cta__blob cta__blob--a" />
          <div className="cta__blob cta__blob--b" />

          <div className="cta__eyebrow">הצטרפות לפול</div>

          <h2>
            רוצה להתחיל להרוויח
            <br />
            מהקמפיינים שלנו?
          </h2>
          <p>
            מלא שאלון קצר בכמה שלבים והצטרף לרשת היוצרים ולפּוּל של Maker. ככל שנכיר טוב יותר את
            הנתונים שלך — נוכל להתאים לך קמפיינים מדויקים ובעלי ערך גבוה יותר.
          </p>

          <div className="cta__actions">
            <button className="btn btn--light btn--lg" type="button" onClick={openJoin}>
              התחל את השאלון
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </button>
            <span className="cta__meta">כ־2 דקות · בלי התחייבות · גם עם 0 עוקבים</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
