const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ name, size = 24 }) {
  const paths = shapes[name] || shapes.check
  return (
    <svg {...base} width={size} height={size} aria-hidden="true">
      {paths}
    </svg>
  )
}

const shapes = {
  pool: (
    <>
      <path d="M3 10.5 12 5l9 5.5" />
      <path d="M5 12v4.5c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5V12" />
      <path d="M5 12c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5" />
    </>
  ),
  template: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </>
  ),
  camera: (
    <>
      <rect x="2.5" y="6.5" width="13" height="11" rx="3" />
      <path d="M15.5 11l6-3.2v8.4l-6-3.2z" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.4 12.2 2.5 2.5 4.7-5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4 15v3a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 20 18v-3" />
    </>
  ),
  views: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12S18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  bonus: (
    <>
      <path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.2l5.9-.8L12 3Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6" />
      <path d="M16.5 5.2a3.3 3.3 0 0 1 0 6.2M17.5 14.9c2.3.6 3.7 2.3 3.7 5.1" />
    </>
  ),
  money: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 10v4M18 10v4" />
    </>
  ),
  bolt: (
    <>
      <path d="M13.5 2.5 5 13.5h5.5L9.5 21.5 18 10h-5.5l1-7.5Z" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M10.5 5.5h3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21.5c4.6-2 7-5.4 7-9.6V5.9L12 3.2 5 5.9v6c0 4.2 2.4 7.6 7 9.6Z" />
      <path d="m9 11.8 2.2 2.2L15.2 10" />
    </>
  ),
  arrow: (
    <>
      <path d="M19 12H5" />
      <path d="m11.5 5.5-6.5 6.5 6.5 6.5" />
    </>
  ),
  x: (
    <>
      <path d="m7 7 10 10M17 7 7 17" />
    </>
  ),
  smallCheck: (
    <>
      <path d="m6 12.4 3.8 3.8L18 7.8" />
    </>
  ),
}
