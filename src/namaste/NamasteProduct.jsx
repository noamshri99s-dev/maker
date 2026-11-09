import SkyIcon from '../sky/SkyIcon'
import Jewelry from './Jewelry'
import { namasteFeatures, namasteSite, namasteSteps, namasteTalkingPoints } from './content'

export default function NamasteProduct() {
  return (
    <>
      <section className="nm-product" id="product">
        <div className="nm-product__grid">
          <div>
            <p className="nm-kicker">המוצר שמצלמים</p>
            <h2>
              תכשיט אחד.
              <br />
              עבודת יד.
            </h2>
            <p className="nm-lead">
              נמסטה עושה תכשיטים בעבודת יד. מצלמות סרטון אחד על הפריט שמגיע אלייך — ועל הסרטון הזה
              מקבלות את התכשיט, בשווי ₪{namasteSite.productValue}.
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
            <p>נמסטה</p>
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
          <p>ארבעה שלבים. הפול הוא לחמש יוצרות שנרשמות לקמפיין הזה.</p>
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
