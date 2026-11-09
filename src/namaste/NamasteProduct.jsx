import SkyIcon from '../sky/SkyIcon'
import Jewelry from './Jewelry'
import { namasteFeatures, namasteSite, namasteSteps, namasteTalkingPoints } from './content'

export default function NamasteProduct() {
  return (
    <>
      <section className="nm-product" id="product">
        <div className="nm-product__grid">
          <div>
            <p className="nm-kicker">מה כלול בקמפיין</p>
            <h2>
              התכשיט בקמפיין.
              <br />
              לא בהרשמה.
            </h2>
            <p className="nm-lead">
              נמסטה עושה תכשיטים בעבודת יד. התכשיט בשווי ₪{namasteSite.productValue} הוא התמורה של
              הקמפיין, ורק למי שתאושר ותשלים סרטון אחד. ההרשמה לדף הזה לא נותנת אותו.
            </p>
            <div className="nm-talk">
              <h3>מה אומרות בסרטון</h3>
              <ul>
                {namasteTalkingPoints.map((point) => (
                  <li key={point}>
                    <SkyIcon name="check" size={14} stroke={2.6} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="nm-showcase">
            <Jewelry className="nm-showcase__jewel" />
            <p>תמורה לקמפיין שאושר</p>
            <strong>תכשיט עבודת יד</strong>
            <b>₪{namasteSite.productValue}</b>
          </aside>
        </div>

        <div className="nm-features">
          {namasteFeatures.map((feature) => (
            <article className="nm-card" key={feature.title}>
              <span className="nm-card__icon">
                <SkyIcon name={feature.icon} size={22} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nm-how" id="how">
        <div className="nm-how__head">
          <h2>איך זה עובד</h2>
          <p>ארבעה שלבים. ההרשמה היא מועמדות. הקמפיין והתכשיט מגיעים רק אחרי אישור.</p>
        </div>
        <ol className="nm-steps">
          {namasteSteps.map((step) => (
            <li className="nm-step" key={step.n}>
              <span className="nm-step__num">{step.n}</span>
              <span className="nm-card__icon">
                <SkyIcon name={step.icon} size={22} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
