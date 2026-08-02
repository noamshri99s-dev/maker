import Reveal from './Reveal'
import { earnings, site } from '../content'

export default function Earnings() {
  return (
    <section className="section section--ink" id="money">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            כמה מרוויחים
          </Reveal>
          <Reveal as="h2" className="h2">
            נתונים. ניקוד. בונוס.
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            הכסף לא בא מהאוויר: העסק מכניס תקציב לפּוּל, ומהפּוּל משולם לכל היוצרים לפי הנתונים שהם
            הביאו בתוך חלון הזמן.
          </Reveal>
        </div>

        <div className="stats">
          {earnings.map((e, i) => (
            <Reveal className="stat" key={e.label} delay={i * 80}>
              <div className="stat__value">{e.value}</div>
              <div className="stat__label">{e.label}</div>
              <p className="stat__text">{e.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="pool-bar" delay={80}>
          <div className="pool-bar__top">
            <h3>איך הפּוּל מתחלק</h3>
            <span>ככל שהסרטון שלך מביא נתונים טובים יותר — החלק שלך גדל</span>
          </div>
          <div className="split">
            <div>נתונים שהבאת</div>
            <div>ניקוד אישי</div>
            <div>בונוס ביצועים</div>
            <div>יתרת הפּוּל</div>
          </div>
          <p className="note">
            הניקוד האישי שלך עולה עם כל סרטון שאושר ועם הביצועים שלו. מעבר של {site.numbers.bonusViews}{' '}
            בנתוני הקמפיין מפעיל בונוס נוסף מעל התשלום הרגיל. הסכומים המדויקים לנתונים ולבונוס נקבעים לכל קמפיין
            בנפרד ומוצגים לך לפני שאתה מצלם.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
