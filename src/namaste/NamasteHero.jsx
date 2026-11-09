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
          קמפיין פתוח · {namasteSite.poolSize} מקומות בפול
        </p>
        <h1>
          <span>סרטון אחד.</span>
          <span>תכשיט בשווי ₪{namasteSite.productValue}.</span>
        </h1>
        <p className="nm-hero__sub">
          מגייסים {namasteSite.poolSize} יוצרות לצלם סרטון אחד על נמסטה. ההצעה היא תכשיט עבודת יד
          בשווי ₪{namasteSite.productValue} — הוא מגיע הביתה, ויש תבנית מוכנה לצילום.
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
          <span>ההצעה</span>
          <strong>תכשיט עבודת יד</strong>
          <p>נמסטה שולחת את הפריט הביתה. זה מה שמקבלות על הסרטון.</p>
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
