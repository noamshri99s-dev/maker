import Reveal from './Reveal'
import proofOne from './צילום מסך 2026-07-30 ב-19.29.08.png'
import proofTwo from './צילום מסך 2026-07-30 ב-19.29.37.png'
import proofThree from './צילום מסך 2026-07-30 ב-19.30.03.png'
import proofFour from './צילום מסך 2026-07-30 ב-19.30.31.png'
import proofFive from './צילום מסך 2026-07-30 ב-19.31.11.png'

const conversations = [
  { src: proofOne, position: 'top' },
  { src: proofTwo, position: 'center' },
  { src: proofThree, position: 'center' },
  { src: proofFour, position: 'center' },
  { src: proofFive, position: 'center' },
]

export default function SocialProof() {
  return (
    <section className="section social-proof" aria-labelledby="social-proof-title">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            זה כבר קורה
          </Reveal>
          <Reveal as="h2" className="h2" id="social-proof-title">
            אנשים רואים את הרעיון.
            <br />
            <span className="grad">ורוצים להיות חלק ממנו.</span>
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            עוד לפני שהתחלנו, יוצרים כבר ביקשו להצטרף. בלי הבטחות גדולות — פשוט כי המודל נשמע להם
            הגיוני.
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
                alt={`שיחה עם יוצר שהתעניין בהצטרפות ל-Maker, דוגמה ${index + 1}`}
                loading="lazy"
                style={{ objectPosition: conversation.position }}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="proof-summary" delay={180}>
          <strong>וזו רק ההתחלה.</strong>
          <span>הקהילה הבאה של היוצרים כבר מחכה להיבנות.</span>
        </Reveal>
      </div>
    </section>
  )
}
