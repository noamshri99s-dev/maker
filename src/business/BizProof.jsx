import Reveal from '../components/Reveal'
import proofOne from '../components/צילום מסך 2026-07-30 ב-19.29.08.png'
import proofTwo from '../components/צילום מסך 2026-07-30 ב-19.29.37.png'
import proofThree from '../components/צילום מסך 2026-07-30 ב-19.30.03.png'
import proofFour from '../components/צילום מסך 2026-07-30 ב-19.30.31.png'
import proofFive from '../components/צילום מסך 2026-07-30 ב-19.31.11.png'

const conversations = [
  { src: proofOne, position: 'top' },
  { src: proofTwo, position: 'center' },
  { src: proofThree, position: 'center' },
  { src: proofFour, position: 'center' },
  { src: proofFive, position: 'center' },
]

export default function BizProof() {
  return (
    <section className="section social-proof" aria-labelledby="biz-proof-title">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            הצד שכבר מוכן
          </Reveal>
          <Reveal as="h2" className="h2" id="biz-proof-title">
            את היוצרים לא צריך לשכנע.
            <br />
            <span className="grad">הם מבקשים להצטרף.</span>
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            הכאב הגדול בקמפיין תוכן הוא לגייס אנשים שיצלמו. אצלנו זה כבר פתור — אלה שיחות אמיתיות של
            יוצרים שביקשו להיכנס לרשת עוד לפני שהתחלנו.
          </Reveal>
        </div>

        <div className="proof-wall">
          {conversations.map((conversation, index) => (
            <Reveal
              className={`proof-shot proof-shot--${index + 1}`}
              key={conversation.src}
              delay={90 + index * 55}
            >
              <img
                src={conversation.src}
                alt={`שיחה עם יוצר שביקש להצטרף לרשת Maker, דוגמה ${index + 1}`}
                loading="lazy"
                style={{ objectPosition: conversation.position }}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="proof-summary" delay={180}>
          <strong>זה אומר דבר אחד עבורך.</strong>
          <span>ברגע שהקמפיין שלך נפתח — יש מי שיצלם אותו.</span>
        </Reveal>
      </div>
    </section>
  )
}
