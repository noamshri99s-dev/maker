import { useEffect, useId, useRef, useState } from 'react'
import { useLead } from '../business/BizLeadContext'
import { bizSite } from '../business/content'
import { brief } from './content'

const initial = { phone: '', businessName: '', budget: brief.budget.start, campaignType: '', creatorSizes: [] }

const fmt = (n) => n.toLocaleString('he-IL')

export default function SkyBrief() {
  const titleId = useId()
  const { open, closeLead } = useLead()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [data, setData] = useState(initial)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const firstField = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    setStep(0)
    setDir(1)
    setData(initial)
    setError('')
    setSending(false)
    setSent(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeLead()
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstField.current?.focus(), 60)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, closeLead])

  if (!open) return null

  const set = (k, v) => {
    setData((d) => ({ ...d, [k]: v }))
    setError('')
  }
  const toggleSize = (id) =>
    setData((d) => ({
      ...d,
      creatorSizes: d.creatorSizes.includes(id) ? d.creatorSizes.filter((x) => x !== id) : [...d.creatorSizes, id],
    }))

  const steps = ['contact', 'budget', 'type', 'size']
  const id = steps[step]
  const isLast = step === steps.length - 1

  const validate = () => {
    if (id === 'contact') {
      if (data.phone.replace(/\D/g, '').length < 9) return 'צריך מספר טלפון תקין כדי שנחזור אליכם'
      if (!data.businessName.trim()) return 'איך קוראים לעסק?'
    }
    if (id === 'type' && !data.campaignType) return 'בחרו איזה קמפיין מתאים לכם'
    if (id === 'size' && !data.creatorSizes.length) return 'בחרו לפחות גודל אחד (או "תמליצו לי")'
    return ''
  }

  const budgetLabel = data.budget >= brief.budget.max ? `${fmt(brief.budget.max)}+ ₪` : `${fmt(data.budget)} ₪`
  const label = (list, v) => list.find((o) => o.id === v)?.title || v

  const submit = async () => {
    setSending(true)
    setError('')
    const type = label(brief.types, data.campaignType)
    const sizes = data.creatorSizes.map((s) => label(brief.sizes, s)).join(', ')
    const message = [
      'בריף חדש מהאתר של Maker',
      '',
      `טלפון: ${data.phone}`,
      `שם העסק: ${data.businessName}`,
      `תקציב לקמפיין: ${budgetLabel}`,
      `סוג קמפיין: ${type}`,
      `גודל יוצרים: ${sizes}`,
    ].join('\n')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: bizSite.web3formsAccessKey,
          subject: `Maker — בריף חדש: ${data.businessName}`,
          from_name: 'Maker Brief',
          business_name: data.businessName,
          phone: data.phone,
          budget: budgetLabel,
          campaign_type: type,
          creator_sizes: sizes,
          message,
          botcheck: false,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message)
      setSent(true)
    } catch {
      setError('משהו השתבש בשליחה. נסו שוב בעוד רגע 🙏')
    } finally {
      setSending(false)
    }
  }

  const next = () => {
    if (sending) return
    const msg = validate()
    if (msg) return setError(msg)
    if (isLast) return submit()
    setDir(1)
    setStep((s) => s + 1)
  }
  const back = () => {
    if (step === 0) return closeLead()
    setDir(-1)
    setError('')
    setStep((s) => s - 1)
  }

  const pct = ((data.budget - brief.budget.min) / (brief.budget.max - brief.budget.min)) * 100
  const tier = brief.budget.moods.reduce((acc, m) => (data.budget >= m.from ? m : acc), brief.budget.moods[0])

  return (
    <div className="skb" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="skb__backdrop" aria-label="סגירה" onClick={closeLead} />

      <div className="skb__panel">
        <div className="skb__head">
          <span className="skb__brand">
            <span dir="ltr">maker</span> · בריף לקמפיין
          </span>
          <button type="button" className="skb__close" aria-label="סגירה" onClick={closeLead}>
            ✕
          </button>
          {!sent ? (
            <div className="skb__dots" aria-label={`שלב ${step + 1} מתוך ${steps.length}`}>
              {steps.map((s, i) => (
                <i key={s} className={i < step ? 'is-done' : i === step ? 'is-on' : ''} />
              ))}
            </div>
          ) : null}
        </div>

        {sent ? (
          <div className="skb__body skb__done">
            <div className="skb__burst" aria-hidden="true">
              {['🎉', '🎬', '✨', '📱', '🙌', '⭐'].map((e, i) => (
                <span key={i} style={{ '--i': i }}>
                  {e}
                </span>
              ))}
            </div>
            <h2 id={titleId}>{brief.done.title}</h2>
            <p>{brief.done.text}</p>
            <button type="button" className="skb__next" onClick={closeLead}>
              {brief.done.cta}
            </button>
          </div>
        ) : (
          <form
            className="skb__body"
            onSubmit={(e) => {
              e.preventDefault()
              next()
            }}
            noValidate
          >
            <div key={id} className={`skb__step ${dir > 0 ? 'from-end' : 'from-start'}`}>
              <span className="skb__emoji" aria-hidden="true">
                {brief.steps[id].emoji}
              </span>
              <h2 id={titleId}>{brief.steps[id].title}</h2>
              <p className="skb__lead">{brief.steps[id].text}</p>

              {id === 'contact' ? (
                <div className="skb__fields">
                  <label className="skb__field">
                    <span>מספר טלפון</span>
                    <input
                      ref={firstField}
                      id="skb-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      placeholder="050-000-0000"
                      value={data.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </label>
                  <label className="skb__field">
                    <span>שם העסק</span>
                    <input
                      id="skb-business"
                      type="text"
                      autoComplete="organization"
                      placeholder="למשל: הקפה של דנה"
                      value={data.businessName}
                      onChange={(e) => set('businessName', e.target.value)}
                    />
                  </label>
                </div>
              ) : null}

              {id === 'budget' ? (
                <div className="skb__budget">
                  <div className="skb__amount" aria-live="polite">
                    <b dir="ltr">{budgetLabel}</b>
                    <span>
                      {tier.emoji} {tier.label}
                    </span>
                  </div>
                  <input
                    id="skb-budget"
                    className="skb__range"
                    type="range"
                    min={brief.budget.min}
                    max={brief.budget.max}
                    step={brief.budget.step}
                    value={data.budget}
                    style={{ '--p': `${pct}%` }}
                    onChange={(e) => set('budget', Number(e.target.value))}
                    aria-label="תקציב לקמפיין בשקלים"
                    aria-valuetext={budgetLabel}
                  />
                  <div className="skb__scale" aria-hidden="true">
                    <span dir="ltr">{fmt(brief.budget.min)} ₪</span>
                    <span dir="ltr">{fmt(brief.budget.max)}+ ₪</span>
                  </div>
                </div>
              ) : null}

              {id === 'type' ? (
                <div className="skb__cards skb__cards--two" role="radiogroup" aria-label="סוג הקמפיין">
                  {brief.types.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={data.campaignType === o.id}
                      className={`skb__card ${data.campaignType === o.id ? 'is-on' : ''}`}
                      onClick={() => set('campaignType', o.id)}
                    >
                      <span className="skb__card-emoji" aria-hidden="true">
                        {o.emoji}
                      </span>
                      <b>{o.title}</b>
                      <small>{o.text}</small>
                    </button>
                  ))}
                </div>
              ) : null}

              {id === 'size' ? (
                <div className="skb__cards" role="group" aria-label="גודל היוצרים">
                  {brief.sizes.map((o) => {
                    const on = data.creatorSizes.includes(o.id)
                    return (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={on}
                        className={`skb__card skb__card--row ${on ? 'is-on' : ''}`}
                        onClick={() => {
                          toggleSize(o.id)
                          setError('')
                        }}
                      >
                        <span className="skb__card-emoji" aria-hidden="true">
                          {o.emoji}
                        </span>
                        <span className="skb__card-txt">
                          <b dir="auto">{o.title}</b>
                          <small>{o.text}</small>
                        </span>
                        <span className="skb__tick" aria-hidden="true">
                          {on ? '✓' : ''}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>

            <p className="skb__error" role="alert">
              {error}
            </p>

            <div className="skb__actions">
              <button type="button" className="skb__back" onClick={back}>
                {step === 0 ? 'סגירה' : 'חזרה'}
              </button>
              <button type="submit" className="skb__next" disabled={sending}>
                {sending ? 'שולחים…' : isLast ? 'שליחה 🚀' : 'המשך'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
