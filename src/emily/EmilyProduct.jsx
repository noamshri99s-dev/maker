import { Icon } from '../components/Icons'
import emilyPortrait from '../assets/emily.webp'
import { emilyChat, emilyFeatures, emilySteps, emilyTalkingPoints } from './content'

export default function EmilyProduct() {
  return (
    <>
      <section className="section emily-product" id="product">
        <div className="wrap emily-product__grid">
          <div>
            <div className="eyebrow">המוצר שמצלמים</div>
            <h2 className="h2">
              אמילי זוכרת את השיחות.
              <br />
              אתם רק מדברים.
            </h2>
            <p className="lead">
              אמילי היא המזכירה החכמה בוואטסאפ לעסקים שחיים משיחות טלפון. השיחות מוקלטות, מתומללות
              ומסוכמות ב־AI. היא מוציאה משימות, זוכרת מה סיכמתם עם כל לקוח, ושולחת הכל ישר לוואטסאפ.
            </p>

            <div className="emily-talk">
              <h3>מה אומרים בסרטון</h3>
              <ul>
                {emilyTalkingPoints.map((point) => (
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

          <div className="emily-phone">
            <div className="emily-phone__bezel">
              <div className="emily-phone__notch" aria-hidden="true" />
              <div className="emily-chat">
                <div className="emily-chat__head">
                  <img src={emilyPortrait} alt="" width="40" height="40" />
                  <div>
                    <strong>אמילי</strong>
                    <span>מקוונת</span>
                  </div>
                </div>

                <div className="emily-chat__day">היום</div>

                {emilyChat.map((message, index) => (
                  <article
                    className={`emily-bubble emily-bubble--${message.from}`}
                    key={`${message.from}-${index}`}
                  >
                    {message.text ? <p>{message.text}</p> : null}
                    {message.extra ? <p>{message.extra}</p> : null}
                    {message.task ? (
                      <div className="emily-bubble__meta">
                        <span>משימה: {message.task}</span>
                        <span>תזכורת: {message.reminder}</span>
                      </div>
                    ) : null}
                    <time>{message.time}</time>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="grid grid--3 emily-features">
            {emilyFeatures.map((feature) => (
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
              נרשמים. מצלמים אחד.
              <br />
              מקבלים תשלום.
            </h2>
            <p className="lead">ארבעה שלבים. הפול הוא לחמישה יוצרים שנרשמים לקמפיין הזה.</p>
          </div>

          <div className="grid grid--2 emily-steps">
            {emilySteps.map((step) => (
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
