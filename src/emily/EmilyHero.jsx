import { Icon } from '../components/Icons'
import emilyPortrait from '../assets/emily.webp'
import { emilyHeroPoints, emilySite, emilyStrip } from './content'
import { handleSectionClick } from './scrollToSection'

export default function EmilyHero() {
  return (
    <section className="hero emily-hero" id="top">
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <div className="hero__glow hero__glow--c" />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="eyebrow">✦ קמפיין פתוח · {emilySite.poolSize} מקומות בפול</div>

          <h1>
            סרטון UGC אחד.
            <br />
            <span className="grad">תשלום מהפול.</span>
          </h1>

          <p className="hero__sub">
            מגייסים {emilySite.poolSize} יוצרים לצלם סרטון אחד על{' '}
            <strong className="hero__sub-em">אמילי — המזכירה החכמה בוואטסאפ</strong>. מקבלים תבנית,
            מצלמים בטלפון, והכסף יוצא מהפול.
          </p>

          <div className="hero__cta">
            <a
              className="btn btn--primary btn--lg"
              href="#join"
              onClick={(event) => handleSectionClick(event, 'join')}
            >
              {emilySite.ctaLabel}
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </a>
            <a
              className="btn btn--outline btn--lg"
              href="#product"
              onClick={(event) => handleSectionClick(event, 'product')}
            >
              {emilySite.ctaSecondaryLabel}
            </a>
          </div>

          <div className="hero__note">
            {emilyHeroPoints.map((point) => (
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
              <strong>הפול פתוח ל־{emilySite.poolSize}</strong>
              <small>נסגר אחרי שנרשמים</small>
            </div>
          </div>

          <div className="emily-hero__stage">
            <img
              className="emily-hero__portrait"
              src={emilyPortrait}
              alt="אמילי, המזכירה החכמה בוואטסאפ"
              width="480"
              height="480"
            />
            <div className="emily-hero__card" aria-hidden="true">
              <div className="emily-hero__card-top">
                <span className="emily-hero__online" />
                אמילי · מקוונת
              </div>
              <p>כל שיחה מוקלטת, מתומללת ומסוכמת. אוטומטית.</p>
            </div>
          </div>

          <div className="hero-float hero-float--b">
            <span className="hero-float__ico hero-float__ico--pay">
              <Icon name="money" size={16} />
            </span>
            <div>
              <strong>סרטון אחד בתשלום</strong>
              <small>מהפול, אחרי אישור</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="wrap hero-strip__inner">
          {emilyStrip.map((item) => (
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
