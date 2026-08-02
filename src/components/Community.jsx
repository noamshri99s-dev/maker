import Reveal from './Reveal'

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

function NetworkArt() {
  const ring = [
    [140, 96],
    [268, 52],
    [412, 88],
    [104, 226],
    [252, 262],
    [408, 232],
    [560, 60],
    [700, 108],
    [836, 74],
    [612, 250],
    [760, 268],
    [880, 200],
  ]
  const hub = [500, 158]

  return (
    <svg viewBox="0 0 980 320" role="img" aria-label="איור: רשת יוצרים מחוברים סביב מרכז אחד">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hubFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9a52" />
          <stop offset="100%" stopColor="#e04d05" />
        </linearGradient>
      </defs>

      <circle cx={hub[0]} cy={hub[1]} r="150" fill="url(#hubGlow)" />

      {ring.map(([x, y], i) => (
        <line
          key={`l-${i}`}
          className="net-edge dash"
          x1={hub[0]}
          y1={hub[1]}
          x2={x}
          y2={y}
          style={{ animationDelay: `${i * 0.14}s` }}
        />
      ))}

      {ring.map(([x, y], i) => (
        <line
          key={`m-${i}`}
          className="net-edge"
          x1={x}
          y1={y}
          x2={ring[(i + 1) % ring.length][0]}
          y2={ring[(i + 1) % ring.length][1]}
          opacity="0.22"
        />
      ))}

      {ring.map(([x, y], i) => (
        <g key={`n-${i}`} className="net-pulse" style={{ animationDelay: `${i * 0.26}s` }}>
          <circle className="net-node" cx={x} cy={y} r="24" />
          <circle cx={x} cy={y - 6} r="5.6" fill="#e04d05" />
          <path d={`M${x - 10} ${y + 12}c0-5.6 4.6-9 10-9s10 3.4 10 9`} fill="#e04d05" />
        </g>
      ))}

      <circle cx={hub[0]} cy={hub[1]} r="54" fill="url(#hubFill)" />
      <text
        x={hub[0]}
        y={hub[1] + 9}
        textAnchor="middle"
        fontSize="25"
        fontWeight="900"
        fill="#fff"
        letterSpacing="-1"
      >
        Maker
      </text>
    </svg>
  )
}
