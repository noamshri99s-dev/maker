const items = [
  'עשרות יוצרים לקמפיין',
  'בריף שאנחנו בונים',
  'אישור שלך לכל סרטון',
  'תשלום לפי צפיות',
  'דוח נתונים שקוף',
  'בלי ריטיינר חודשי',
  'תוכן שנשאר אצלך',
]

export default function BizMarquee() {
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
