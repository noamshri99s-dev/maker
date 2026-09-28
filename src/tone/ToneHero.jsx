import { Icon } from '../components/Icons'
import toneImage from '../assets/tone.png'
import { toneHeroPoints, toneSite, toneStrip } from './content'
import { handleSectionClick } from '../emily/scrollToSection'

export default function ToneHero() {
  return (
    <section className="hero emily-hero tone-hero" id="top">
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <div className="hero__glow hero__glow--c" />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="eyebrow">✦ קמפיין פתוח · {toneSite.poolSize} מקומות בפול</div>

          <h1>
            סרטון UGC אחד.
            <br />
            <span className="grad">המוצר אצלך.</span>
          </h1>

          <p className="hero__sub">
            מגייסים {toneSite.poolSize} יוצרות לצלם סרטון אחד על{' '}
            <strong className="hero__sub-em">tone. formula 04 — התוסף הראשון בישראל לשיזוף מבפנים</strong>.
            מקבלות את המוצר הביתה, תבנית מוכנה, ומצלמות בטלפון.
          </p>

          <div className="hero__cta">
            <a
              className="btn btn--primary btn--lg"
              href="#join"
              onClick={(event) => handleSectionClick(event, 'join')}
            >
              {toneSite.ctaLabel}
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </a>
            <a
              className="btn btn--outline btn--lg"
              href="#product"
              onClick={(event) => handleSectionClick(event, 'product')}
            >
              {toneSite.ctaSecondaryLabel}
            </a>
          </div>

          <div className="hero__note">
            {toneHeroPoints.map((point) => (
              <span key={point}>
                <i className="tick">
                  <Icon name="smallCheck" size={12} />
                </i>
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__visual emily-hero__visual">
          <div className="hero-float hero-float--a">
            <span className="hero-float__ico">
              <Icon name="users" size={16} />
            </span>
            <div>
              <strong>הפול פתוח ל־{toneSite.poolSize}</strong>
              <small>נסגר אחרי שנרשמות</small>
            </div>
          </div>

          <div className="emily-hero__stage">
            <img
              className="emily-hero__portrait tone-hero__product"
              src={toneImage}
              alt="tone. formula 04 — Golden Glow Accelerator"
              width="480"
              height="480"
            />
            <div className="emily-hero__card tone-hero__card" aria-hidden="true">
              <div className="emily-hero__card-top tone-hero__card-top">
                <span className="emily-hero__online tone-hero__dot" />
                מקבלות את המוצר
              </div>
              <p>צנצנת formula 04 נשלחת אלייך הביתה.</p>
            </div>
          </div>

          <div className="hero-float hero-float--b">
            <span className="hero-float__ico hero-float__ico--pay">
              <Icon name="money" size={16} />
            </span>
            <div>
              <strong>סרטון אחד בלבד</strong>
              <small>לפי תבנית מוכנה</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="wrap hero-strip__inner">
          {toneStrip.map((item) => (
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
