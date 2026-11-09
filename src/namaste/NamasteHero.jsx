import PillButton from '../brand/PillButton'
import SkyIcon from '../sky/SkyIcon'
import Jewelry from './Jewelry'
import { namasteHeroPoints, namasteSite, namasteStrip } from './content'
import { handleSectionClick } from './scroll'

export default function NamasteHero() {
  return (
    <section className="nm-hero" id="top">
      <div className="nm-hero__copy">
        <p className="nm-chip">
          <i />
          מועמדות · עד {namasteSite.poolSize} מקומות
        </p>
        <h1>
          <span>נרשמות למועמדות.</span>
          <span>התכשיט לא מתנה.</span>
        </h1>
        <p className="nm-hero__sub">
          ההרשמה היא בקשה להיכלל בפול בלבד. היא לא מקנה את התכשיט, לא מהווה מתנה, ולא מבטיחה קבלה
          לקמפיין. מי שתאושר ותשלים סרטון אחד — התמורה היא תכשיט עבודת יד בשווי ₪
          {namasteSite.productValue}.
        </p>
        <div className="nm-hero__ctas">
          <PillButton href="#join" onClick={(event) => handleSectionClick(event, 'join')}>
            {namasteSite.ctaLabel}
          </PillButton>
          <a className="nm-ghost" href="#product" onClick={(event) => handleSectionClick(event, 'product')}>
            {namasteSite.ctaSecondaryLabel}
          </a>
        </div>
        <ul className="nm-points">
          {namasteHeroPoints.map((point) => (
            <li key={point}>
              <SkyIcon name="check" size={14} stroke={2.6} />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <article className="nm-offer">
        <Jewelry className="nm-offer__jewel" />
        <div className="nm-offer__copy">
          <span>הקמפיין, לא ההרשמה</span>
          <strong>תכשיט עבודת יד</strong>
          <p>תמורה למי שתאושר ותשלים. ההרשמה עצמה היא רק הזמנה להגיש מועמדות.</p>
        </div>
        <b className="nm-offer__price">₪{namasteSite.productValue}</b>
      </article>

      <ul className="nm-strip">
        {namasteStrip.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
