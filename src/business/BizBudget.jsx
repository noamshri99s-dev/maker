import Reveal from '../components/Reveal'
import { bizBudget, bizSite } from './content'

export default function BizBudget() {
  return (
    <section className="section section--ink" id="budget">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            איך משלמים
          </Reveal>
          <Reveal as="h2" className="h2">
            תקציב בפּוּל.
            <br />
            תשלום לפי צפיות.
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            אתה מכניס תקציב לפּוּל של הקמפיין. מהפּוּל יוצא כסף רק על צפיות שנספרו בפועל — לא על
            הבטחות, לא על עוקבים, ולא על ריטיינר קבוע.
          </Reveal>
        </div>

        <div className="stats">
          {bizBudget.map((e, i) => (
            <Reveal className="stat" key={e.label} delay={i * 80}>
              <div className="stat__value">{e.value}</div>
              <div className="stat__label">{e.label}</div>
              <p className="stat__text">{e.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="pool-bar" delay={80}>
          <div className="pool-bar__top">
            <h3>איך התקציב עובד</h3>
            <span>כל שקל בפּוּל מחובר לתוכן שעובד — לא להבטחות מראש</span>
          </div>
          <div className="split">
            <div>תקציב נכנס</div>
            <div>יוצרים מצלמים</div>
            <div>צפיות נספרות</div>
            <div>תשלום מהפּוּל</div>
          </div>
          <p className="note">
            העלות לכל {bizSite.numbers.perViewsUnit} צפיות נקבעת לכל קמפיין בנפרד ומוצגת לך לפני
            שהקמפיין יוצא לדרך. הצפיות נספרות בחלון של {bizSite.numbers.windowDays} ימים מההעלאה,
            ואתה מקבל דוח מסודר בסוף.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
