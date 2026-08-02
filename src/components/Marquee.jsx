const items = [
  'יוצרים אמיתיים',
  'סרטון אחד בטלפון',
  'תבנית מוכנה',
  'אישור לפני העלאה',
  'תשלום לפי נתונים',
  'בונוס לביצועים',
  'ביחד, לא לבד',
]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      {[0, 1].map((i) => (
        <div className="marquee__track" key={i}>
          {items.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      ))}
    </div>
  )
}
