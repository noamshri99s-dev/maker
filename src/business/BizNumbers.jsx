import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icons'
import { bizStats } from './content'

function CountUp({ to, prefix = '', suffix = '', run }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(to)
      return undefined
    }

    let raf
    const duration = 1250
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])

  return (
    <span className="biz-num__value">
      {prefix}
      {value.toLocaleString('he-IL')}
      {suffix}
    </span>
  )
}

export default function BizNumbers() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="biz-num" ref={ref} aria-label="במספרים">
      <div className="wrap">
        <div className="biz-num__grid">
          {bizStats.map((s) => (
            <div className="biz-num__item" key={s.label}>
              <span className="biz-num__ico">
                <Icon name={s.icon} size={20} />
              </span>
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} run={run} />
              <span className="biz-num__label">{s.label}</span>
              <span className="biz-num__sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
