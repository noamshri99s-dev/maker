import { useEffect, useId, useState } from 'react'
import { Icon } from '../components/Icons'
import { bizSite } from './content'
import { useLead } from './BizLeadContext'

const initialForm = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  product: '',
  platforms: [],
  budget: '',
  goal: '',
  timeline: '',
  source: '',
}

const platformOptions = [
  { id: 'instagram', label: 'אינסטגרם' },
  { id: 'tiktok', label: 'טיקטוק' },
  { id: 'facebook', label: 'פייסבוק' },
]

const steps = [
  {
    id: 'business',
    title: 'קודם כל, מי העסק?',
    text: 'שם העסק ואיש קשר — כדי שנחזור אליך עם הצעה לקמפיין.',
  },
  {
    id: 'product',
    title: 'מה המוצר שמצלמים?',
    text: 'ספר לנו בקצרה על המוצר או השירות — זה הבסיס לבריף של היוצרים.',
  },
  {
    id: 'campaign',
    title: 'איך נראה הקמפיין?',
    text: 'רשתות, תקציב ומטרה — כדי שנתאים לך את גודל הרשת הנכון.',
  },
  {
    id: 'timing',
    title: 'סיום קצר',
    text: 'מתי תרצה להתחיל, ואיך הגעת אלינו.',
  },
]

const budgetOptions = [
  'עד 5,000 ₪',
  '5,000–15,000 ₪',
  '15,000–40,000 ₪',
  'מעל 40,000 ₪',
  'עדיין לא החלטתי',
]

const goalOptions = [
  'מודעות למותג',
  'מכירות / לידים',
  'השקה של מוצר',
  'תוכן לרשתות שלי',
  'אחר',
]

const timelineOptions = [
  'בהקדם האפשרי',
  'בחודש הקרוב',
  'בעוד חודשיים–שלושה',
  'רק בודק כרגע',
]

const sourceOptions = ['Instagram', 'TikTok', 'Facebook', 'חבר או חברה', 'חיפוש בגוגל', 'אחר']

export default function BizWizard() {
  const titleId = useId()
  const { open, closeLead } = useLead()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    setStep(0)
    setDirection(1)
    setError('')
    setSent(false)
    setSubmitting(false)
    setFormData(initialForm)

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') closeLead()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeLead])

  if (!open) return null

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const togglePlatform = (platformId) => {
    setFormData((current) => {
      const selected = current.platforms.includes(platformId)
      const platforms = selected
        ? current.platforms.filter((item) => item !== platformId)
        : [...current.platforms, platformId]

      return { ...current, platforms }
    })
    setError('')
  }

  const validateStep = () => {
    const current = steps[step]

    if (current.id === 'business') {
      if (!formData.businessName.trim()) return 'כתוב/י את שם העסק'
      if (!formData.contactName.trim()) return 'כתוב/י את שם איש הקשר'
      if (!formData.phone.trim()) return 'צריך מספר טלפון כדי שנחזור אליך'
    }

    if (current.id === 'product') {
      if (!formData.product.trim()) return 'ספר/י בקצרה מה המוצר או השירות'
    }

    if (current.id === 'campaign') {
      if (!formData.platforms.length) return 'בחר/י לפחות רשת אחת'
      if (!formData.budget) return 'סמן/י טווח תקציב'
      if (!formData.goal) return 'סמן/י מה המטרה של הקמפיין'
    }

    if (current.id === 'timing') {
      if (!formData.timeline) return 'סמן/י מתי תרצה להתחיל'
      if (!formData.source) return 'סמן/י איך הגעת אלינו'
    }

    return ''
  }

  const goNext = () => {
    if (submitting) return

    const message = validateStep()
    if (message) {
      setError(message)
      return
    }

    if (step < steps.length - 1) {
      setDirection(1)
      setStep((current) => current + 1)
      setError('')
      return
    }

    submit()
  }

  const goBack = () => {
    if (submitting) return
    if (step === 0) {
      closeLead()
      return
    }
    setDirection(-1)
    setStep((current) => current - 1)
    setError('')
  }

  const buildSummary = () => {
    const platforms = formData.platforms
      .map((id) => platformOptions.find((item) => item.id === id)?.label)
      .filter(Boolean)
      .join(', ')

    return [
      'בריף חדש מ-Maker לעסקים',
      '',
      `שם העסק: ${formData.businessName}`,
      `איש קשר: ${formData.contactName}`,
      `טלפון: ${formData.phone}`,
      formData.email && `אימייל: ${formData.email}`,
      `מוצר / שירות: ${formData.product}`,
      `רשתות: ${platforms}`,
      `תקציב: ${formData.budget}`,
      `מטרה: ${formData.goal}`,
      `תזמון: ${formData.timeline}`,
      `איך הגעתי אליכם: ${formData.source}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const submit = async () => {
    setSubmitting(true)
    setError('')

    const payload = {
      access_key: bizSite.web3formsAccessKey,
      subject: `Maker לעסקים — בריף חדש: ${formData.businessName}`,
      from_name: 'Maker Business Brief',
      name: formData.contactName,
      business_name: formData.businessName,
      phone: formData.phone,
      email: formData.email || 'לא צוין',
      product: formData.product,
      platforms: formData.platforms
        .map((id) => platformOptions.find((item) => item.id === id)?.label)
        .filter(Boolean)
        .join(', '),
      budget: formData.budget,
      goal: formData.goal,
      timeline: formData.timeline,
      source: formData.source,
      message: buildSummary(),
      botcheck: false,
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'שליחה נכשלה')
      }

      setSent(true)
    } catch {
      setError('משהו השתבש בשליחה. נסו שוב בעוד רגע.')
    } finally {
      setSubmitting(false)
    }
  }

  const progress = ((step + 1) / steps.length) * 100
  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <div className="wizard" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button className="wizard__backdrop" type="button" aria-label="סגור בריף" onClick={closeLead} />

      <div className="wizard__panel">
        <div className="wizard__top">
          <div>
            <div className="wizard__brand">Maker · בריף לעסקים</div>
            <div className="wizard__count">
              שלב {step + 1} מתוך {steps.length}
            </div>
          </div>
          <button className="wizard__close" type="button" aria-label="סגור" onClick={closeLead}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="wizard__progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="wizard__dots" aria-hidden="true">
          {steps.map((item, index) => (
            <span
              key={item.id}
              className={`wizard__dot ${index === step ? 'is-active' : ''} ${
                index < step ? 'is-done' : ''
              }`}
            />
          ))}
        </div>

        {sent ? (
          <div className="wizard__done">
            <div className="wizard__done-icon">
              <Icon name="check" size={34} />
            </div>
            <h3>קיבלנו את הבריף</h3>
            <p>הפרטים נשלחו אלינו. נחזור אליך בהקדם עם הצעה לקמפיין.</p>
            <button className="btn btn--primary" type="button" onClick={closeLead}>
              סגור
            </button>
          </div>
        ) : (
          <>
            <div
              key={current.id}
              className={`wizard__step wizard__step--${direction > 0 ? 'forward' : 'back'}`}
            >
              <h3 id={titleId}>{current.title}</h3>
              <p>{current.text}</p>

              <div className="wizard__fields">
                {current.id === 'business' && (
                  <>
                    <Field
                      label="שם העסק"
                      name="businessName"
                      value={formData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      autoFocus
                      required
                    />
                    <Field
                      label="שם איש קשר"
                      name="contactName"
                      value={formData.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      required
                    />
                    <Field
                      label="מספר טלפון"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      type="tel"
                      inputMode="tel"
                      required
                    />
                    <Field
                      label="אימייל"
                      name="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      type="email"
                      inputMode="email"
                      optional
                    />
                  </>
                )}

                {current.id === 'product' && (
                  <label className="wizard__field wizard__field--large">
                    <span>מה המוצר או השירות?</span>
                    <textarea
                      name="product"
                      value={formData.product}
                      onChange={(e) => updateField('product', e.target.value)}
                      placeholder="למשל: אפליקציית כושר, מותג אוכל, שירות B2B…"
                      rows={4}
                      autoFocus
                      required
                    />
                  </label>
                )}

                {current.id === 'campaign' && (
                  <>
                    <MultiChoiceGroup
                      label="באילו רשתות תרצה להופיע?"
                      values={formData.platforms}
                      options={platformOptions.map((item) => item.label)}
                      optionIds={platformOptions.map((item) => item.id)}
                      onToggle={togglePlatform}
                    />
                    <ChoiceGroup
                      label="טווח תקציב לקמפיין"
                      value={formData.budget}
                      options={budgetOptions}
                      onChange={(value) => updateField('budget', value)}
                    />
                    <ChoiceGroup
                      label="מה המטרה העיקרית?"
                      value={formData.goal}
                      options={goalOptions}
                      onChange={(value) => updateField('goal', value)}
                    />
                  </>
                )}

                {current.id === 'timing' && (
                  <>
                    <ChoiceGroup
                      label="מתי תרצה להתחיל?"
                      value={formData.timeline}
                      options={timelineOptions}
                      onChange={(value) => updateField('timeline', value)}
                    />
                    <ChoiceGroup
                      label="איך הגעת אלינו?"
                      value={formData.source}
                      options={sourceOptions}
                      onChange={(value) => updateField('source', value)}
                    />
                  </>
                )}
              </div>

              {error && <div className="wizard__error">{error}</div>}
            </div>

            <div className="wizard__nav">
              <button
                className="btn btn--ghost wizard__back"
                type="button"
                onClick={goBack}
                disabled={submitting}
              >
                {step === 0 ? 'סגור' : 'חזרה'}
              </button>
              <button
                className="btn btn--primary wizard__next"
                type="button"
                onClick={goNext}
                disabled={submitting}
              >
                {submitting ? 'שולח…' : isLast ? 'שלחו את הבריף' : 'המשך'}
                {!submitting && (
                  <span className="btn__arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, optional = false, large = false, ...inputProps }) {
  return (
    <label className={`wizard__field ${large ? 'wizard__field--large' : ''}`}>
      <span>
        {label}
        {optional && <small>אופציונלי</small>}
      </span>
      <input {...inputProps} />
    </label>
  )
}

function ChoiceGroup({ label, options, value, onChange, optional = false, compact = false }) {
  return (
    <div className={`wizard__choices ${compact ? 'wizard__choices--compact' : ''}`}>
      <div className="wizard__choices-label">
        {label}
        {optional && <small>אופציונלי</small>}
      </div>
      <div className="wizard__choice-list" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`wizard__choice ${value === option ? 'is-selected' : ''}`}
            onClick={() => onChange(option)}
          >
            <span className="wizard__choice-check">
              <Icon name="smallCheck" size={13} />
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function MultiChoiceGroup({ label, options, optionIds, values, onToggle }) {
  return (
    <div className="wizard__choices wizard__choices--compact">
      <div className="wizard__choices-label">
        {label}
        <small>אפשר לבחור כמה</small>
      </div>
      <div className="wizard__choice-list" role="group" aria-label={label}>
        {options.map((option, index) => {
          const id = optionIds[index]
          const selected = values.includes(id)
          return (
            <button
              key={id}
              type="button"
              className={`wizard__choice ${selected ? 'is-selected' : ''}`}
              onClick={() => onToggle(id)}
              aria-pressed={selected}
            >
              <span className="wizard__choice-check">
                <Icon name="smallCheck" size={13} />
              </span>
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
