export default function PillButton({
  children,
  href,
  variant = 'solid',
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = `mk-pill ${variant === 'glass' ? 'mk-pill--glass' : ''} ${className}`.trim()
  const content = (
    <>
      <span className="mk-pill__icon" aria-hidden="true">
        <svg
          className="mk-pill__arrow"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m11 5-7 7 7 7" />
        </svg>
      </span>
      <span className="mk-pill__label">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
