import Reveal from './Reveal'
import { Icon } from './Icons'
import { site } from '../content'

const rows = [
  {
    yes: true,
    title: 'כמה יוצרים מצלמים',
    text: 'הכמות של הפוסטרים היא המוצר. הרבה סרטונים אמיתיים מהרבה אנשים — זה מה שהעסק קונה.',
  },
  {
    yes: true,
    title: 'שאתה מצלם את עצמך',
    text: 'פנים אמיתיות, קול אמיתי. סרטון אחד בטלפון לפי התבנית שקיבלת.',
  },
  {
    yes: false,
    title: 'כמה עוקבים יש לך',
    text: `${site.numbers.followersNeeded} עוקבים זה מספר חוקי לגמרי. גם בלי קהילה אתה מצטרף ומרוויח.`,
  },
  {
    yes: false,
    title: 'אם אתה "משפיען"',
    text: 'אין צורך בפרופיל מטופח, בפידבק מהעבר או בשיתופי פעולה קודמים.',
  },
]

export default function NoFollowers() {
  return (
    <section className="section section--tint" id="followers">
      <div className="wrap nf">
        <div className="nf__num center">
          <Reveal className="zero" as="div">
            0
          </Reveal>
          <Reveal className="zero-label" as="div" delay={80}>
            עוקבים זה מספר תקין
          </Reveal>
        </div>

        <div>
          <Reveal className="eyebrow" as="div">
            בלי צורך בעוקבים
          </Reveal>
          <Reveal as="h2" className="h2">
            לא חשוב כמה עוקבים יש לך.
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            ב-Maker לא סופרים עוקבים. מה שנספר זה כמה יוצרים מצלמים ואילו נתונים הסרטונים מביאים. אם
            אין לך קהילה — אתה עדיין בפנים.
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
