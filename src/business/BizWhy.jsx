import Reveal from '../components/Reveal'
import { Icon } from '../components/Icons'
import { bizSite } from './content'

const rows = [
  {
    yes: true,
    title: 'כמה אנשים מצלמים את המוצר',
    text: 'הכמות היא המוצר. עשרות סרטונים מעשרות אנשים שונים נראים ברשת כמו טרנד — לא כמו קמפיין.',
  },
  {
    yes: true,
    title: 'כמה צפיות נכנסו בפועל',
    text: `הצפיות נספרות בתוך חלון של ${bizSite.numbers.windowDays} ימים מההעלאה, ומזה נגזר מה שיצא מהפּוּל שלך.`,
  },
  {
    yes: false,
    title: 'כמה עוקבים יש למשפיען',
    text: 'אנחנו לא קונים את הקהל של אדם אחד ולא משלמים פרמיה על גודל פרופיל.',
  },
  {
    yes: false,
    title: 'ריטיינר חודשי קבוע',
    text: 'אתה לא נכנס להתחייבות ארוכה. פותחים קמפיין, מגדירים תקציב, ורואים מה הוא עשה.',
  },
]

export default function BizWhy() {
  return (
    <section className="section section--tint" id="why">
      <div className="wrap nf">
        <div className="nf__num center">
          <Reveal className="zero" as="div">
            {bizSite.numbers.creatorsPerCampaign}
          </Reveal>
          <Reveal className="zero-label" as="div" delay={80}>
            יוצרים על מוצר אחד, במקום אחד
          </Reveal>
        </div>

        <div>
          <Reveal className="eyebrow" as="div">
            למה לא משפיען
          </Reveal>
          <Reveal as="h2" className="h2">
            משפיען אחד זה הימור.
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            כשמשלמים לאדם אחד מראש, כל הקמפיין תלוי בסרטון אחד. כשעשרות אנשים מצלמים את אותו מוצר,
            תמיד יש כמה סרטונים שעובדים — והתשלום נגזר מהם.
          </Reveal>

          <Reveal className="compare" delay={130} style={{ marginTop: 34 }}>
            {rows.map((r) => (
              <div className={`compare__row ${r.yes ? '' : 'compare__row--off'}`} key={r.title}>
                <span className={`badge-icon ${r.yes ? 'badge-icon--yes' : 'badge-icon--no'}`}>
                  <Icon name={r.yes ? 'smallCheck' : 'x'} size={13} />
                </span>
                <div>
                  <strong>{r.title}</strong>
                  <p>{r.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
