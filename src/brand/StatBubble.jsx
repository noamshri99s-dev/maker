export default function StatBubble({ value, unit, label, className = '', ...rest }) {
  return (
    <div className={`mk-stat ${className}`.trim()} {...rest}>
      <span className="mk-stat__value">
        <span dir="ltr">{value}</span>
        {unit ? <span className="mk-stat__unit">{unit}</span> : null}
      </span>
      {label ? <span className="mk-stat__label">{label}</span> : null}
    </div>
  )
}
