import { useId } from 'react'

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

export default function NetworkArt({ label = 'Maker', title }) {
  const uid = useId().replace(/:/g, '')
  const glowId = `hubGlow-${uid}`
  const fillId = `hubFill-${uid}`

  return (
    <svg
      viewBox="0 0 980 320"
      role="img"
      aria-label={title || 'איור: רשת יוצרים מחוברים סביב מרכז אחד'}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9a52" />
          <stop offset="100%" stopColor="#e04d05" />
        </linearGradient>
      </defs>

      <circle cx={hub[0]} cy={hub[1]} r="150" fill={`url(#${glowId})`} />

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

      <circle cx={hub[0]} cy={hub[1]} r="54" fill={`url(#${fillId})`} />
      <text
        x={hub[0]}
        y={hub[1] + 9}
        textAnchor="middle"
        fontSize={label.length > 8 ? 18 : 25}
        fontWeight="900"
        fill="#fff"
        letterSpacing="-1"
      >
        {label}
      </text>
    </svg>
  )
}
