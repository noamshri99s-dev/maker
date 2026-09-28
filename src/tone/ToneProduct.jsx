import { Icon } from '../components/Icons'
import toneImage from '../assets/tone.png'
import { toneFacts, toneFeatures, toneSite, toneSteps, toneTalkingPoints } from './content'

export default function ToneProduct() {
  return (
    <>
      <section className="section emily-product" id="product">
        <div className="wrap emily-product__grid">
          <div>
            <div className="eyebrow">המוצר שמצלמים</div>
            <h2 className="h2">
              פחות שמש.
              <br />
              יותר שיזוף.
            </h2>
            <p className="lead">
              tone. formula 04 היא הפורמולה הראשונה בישראל לשיזוף מבפנים. הכמוסה תומכת בייצור המלנין
              הטבעי של הגוף, בונה גוון ברונזה עמוק ואחיד, ומעניקה לעור מראה זוהר — גם בלי לצאת לשמש.
              מיוצרת בישראל באישור משרד הבריאות.
            </p>

            <div className="emily-talk">
              <h3>מה אומרים בסרטון</h3>
              <ul>
                {toneTalkingPoints.map((point) => (
                  <li key={point}>
                    <i className="tick">
                      <Icon name="smallCheck" size={12} />
                    </i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tone-showcase">
            <img src={toneImage} alt="צנצנת tone. formula 04" width="754" height="918" />
            <div className="tone-showcase__facts">
              {toneFacts.map((fact) => (
                <div key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
            <a
              className="tone-showcase__link"
              href={toneSite.productUrl}
              target="_blank"
              rel="noreferrer"
            >
              לאתר של tone.
            </a>
          </div>
        </div>

        <div className="wrap">
          <div className="grid grid--3 emily-features">
            {toneFeatures.map((feature) => (
              <div className="card" key={feature.title}>
                <div className="card__icon">
                  <Icon name={feature.icon} size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="how">
        <div className="wrap">
          <div className="head center">
            <div className="eyebrow">איך זה עובד</div>
            <h2 className="h2">
              נרשמות. מקבלות את המוצר.
              <br />
              מצלמות אחד.
            </h2>
            <p className="lead">ארבעה שלבים. הפול הוא לחמש יוצרות שנרשמות לקמפיין הזה.</p>
          </div>

          <div className="grid grid--2 emily-steps">
            {toneSteps.map((step) => (
              <div className="card emily-step" key={step.n}>
                <div className="emily-step__top">
                  <span className="emily-step__num">{step.n}</span>
                  <span className="card__icon">
                    <Icon name={step.icon} size={22} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
