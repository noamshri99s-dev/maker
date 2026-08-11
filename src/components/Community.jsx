import Reveal from './Reveal'
import NetworkArt from './NetworkArt'

const items = [
  {
    title: 'אותו קמפיין, המון פנים',
    text: 'עשרות יוצרים מצלמים את אותו מוצר באותו זמן. הרשת יוצרת נפח שאף יוצר בודד לא מייצר לבד.',
  },
  {
    title: 'לא צריך להמציא כלום',
    text: 'התבנית, האישור והמעקב על הנתונים — הכל מגיע מ-Maker. אתה מתעסק רק בלצלם.',
  },
  {
    title: 'הפּוּל הוא משותף',
    text: 'כולנו נמשכים מאותו תקציב של העסק. הצלחה של הקמפיין היא הצלחה של כל מי שנמצא בו.',
  },
]

export default function Community() {
  return (
    <section className="section section--tint" id="community">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            ביחד
          </Reveal>
          <Reveal as="h2" className="h2">
            רשת אחת של יוצרים.
            <br />
            <span className="grad">לא כל אחד לבד.</span>
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            Maker היא לא פלטפורמה שזורקת אותך למים. אתה מצטרף לקולקטיב של יוצרים שעושים את זה יחד —
            אותם קמפיינים, אותו פּוּל, אותה מטרה.
          </Reveal>
        </div>

        <Reveal className="network" delay={90}>
          <NetworkArt />
        </Reveal>

        <div className="together">
          {items.map((it, i) => (
            <Reveal className="together__item" key={it.title} delay={i * 90}>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
