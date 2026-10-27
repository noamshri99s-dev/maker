import { useId } from 'react'

const MARK_PATH = 'M58 142 V98 a21 21 0 0 1 42 0 V142 M100 98 a21 21 0 0 1 42 0 V142'

export default function MakerMark({
  size = 40,
  variant = 'plain',
  dotColor = '#fff',
  glow = false,
  showDot = true,
  strokeWidth = 18,
  color,
  title,
  className = '',
  style,
  ...rest
}) {
  const uid = useId().replace(/:/g, '')
  const tileId = `mk-tile-${uid}`
  const glowId = `mk-glow-${uid}`
  const isTile = variant === 'tile'
  const markColor = color ?? (isTile ? '#fff' : undefined)

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`mk-mark ${isTile ? 'mk-mark--tile' : ''} ${className}`.trim()}
      style={markColor ? { color: markColor, ...style } : style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {isTile || glow ? (
        <defs>
          {isTile ? (
            <linearGradient id={tileId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3F7ED0" />
              <stop offset="1" stopColor="#9CC4EE" />
            </linearGradient>
          ) : null}
          {glow ? (
            <radialGradient id={glowId}>
              <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          ) : null}
        </defs>
      ) : null}

      {isTile ? <rect width="200" height="200" rx="48" fill={`url(#${tileId})`} /> : null}

      <path
        d={MARK_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showDot && glow ? <circle cx="150" cy="56" r="24" fill={`url(#${glowId})`} /> : null}
      {showDot ? <circle className="mk-rec" cx="150" cy="56" r="11" style={{ fill: dotColor }} /> : null}
    </svg>
  )
}
