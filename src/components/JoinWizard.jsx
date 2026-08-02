import { useEffect, useId, useState } from 'react'
import { Icon } from './Icons'
import { site } from '../content'
import { useJoin } from './JoinContext'

const initialForm = {
  fullName: '',
  age: '',
  phone: '',
  followers: '',
  platforms: [],
  instagram: '',
  tiktok: '',
  facebook: '',
  monthlyViews: '',
  niche: '',
  pastCampaign: '',
  availability: '',
  source: '',
}

const platformOptions = [
  { id: 'instagram', label: 'אינסטגרם' },
  { id: 'tiktok', label: 'טיקטוק' },
  { id: 'facebook', label: 'פייסבוק' },
]

const steps = [
  {
    id: 'contact',
    title: 'קודם כל, נכיר',
    text: 'שם ומספר טלפון — כדי שנוכל לחזור אליך עם הקמפיין.',
  },
  {
    id: 'about',
    title: 'עוד קצת עליך',
    text: 'גיל וזמינות — כדי שנתאים לך את הקצב הנכון.',
  },
  {
    id: 'audience',
    title: 'כמה עוקבים יש לך בדיוק?',
    text: 'אין מינימום. ככל שיש יותר מידע — ככה תוכל להיות שווה יותר פר צפייה.',
  },
  {
    id: 'socials',
    title: 'באילו רשתות אתה פעיל?',
    text: 'אפשר לבחור כמה אפשרויות, ואז למלא את שם המשתמש בכל אחת.',
  },
  {
    id: 'more',
    title: 'סיום קצר',
    text: 'הפרטים האלה עוזרים לנו להתאים לך את הקמפיין הנכון.',
  },
]

const availabilityOptions = [
  'כן, אני פנוי/ה להתחיל',
  'כן, אבל באופן חלקי',
  'לא כרגע, אולי בהמשך',
]

const sourceOptions = ['Instagram', 'TikTok', 'Facebook', 'חבר או חברה', 'חיפוש בגוגל', 'אחר']

export default function JoinWizard() {
  const titleId = useId()
  const { open, closeJoin } = useJoin()
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
      if (event.key === 'Escape') closeJoin()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeJoin])

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

      return {
        ...current,
        platforms,
        [platformId]: selected ? '' : current[platformId],
      }
    })
    setError('')
  }

  const validateStep = () => {
    const current = steps[step]

    if (current.id === 'contact') {
      if (!formData.fullName.trim()) return 'כתוב/י את השם המלא'
      if (!formData.phone.trim()) return 'צריך מספר טלפון כדי שנחזור אליך'
    }

    if (current.id === 'about') {
      if (!formData.age) return 'כתוב/י את הגיל'
      if (!formData.availability) return 'סמן/י אם יש לך זמן ליצור תוכן'
    }

    if (current.id === 'audience') {
      if (formData.followers === '') return 'כתוב/י כמה עוקבים יש לך בדיוק — גם 0 זה בסדר'
    }

    if (current.id === 'socials') {
      if (!formData.platforms.length) return 'בחר/י לפחות רשת אחת'
      for (const platform of formData.platforms) {
        if (!formData[platform]?.trim()) {
          const label = platformOptions.find((item) => item.id === platform)?.label
          return `כתוב/י את שם המשתמש ב${label}`
        }
      }
    }

    if (current.id === 'more') {
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
      closeJoin()
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
      'הצטרפות חדשה ל-Maker',
      '',
      `שם: ${formData.fullName}`,
      `טלפון: ${formData.phone}`,
      `גיל: ${formData.age}`,
      `זמינות: ${formData.availability}`,
      `מספר עוקבים מדויק: ${formData.followers}`,
      `רשתות שנבחרו: ${platforms}`,
      formData.platforms.includes('instagram') && `אינסטגרם: ${formData.instagram}`,
      formData.platforms.includes('tiktok') && `טיקטוק: ${formData.tiktok}`,
      formData.platforms.includes('facebook') && `פייסבוק: ${formData.facebook}`,
      formData.monthlyViews && `צפיות חודשיות בעמוד: ${formData.monthlyViews}`,
      formData.niche && `נישה: ${formData.niche}`,
      formData.pastCampaign && `קמפיין בעבר: ${formData.pastCampaign}`,
      `איך הגעתי אליכם: ${formData.source}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const submit = async () => {
    setSubmitting(true)
    setError('')

    const payload = {
      access_key: site.web3formsAccessKey,
      subject: `Maker — הצטרפות חדשה: ${formData.fullName}`,
      from_name: 'Maker Join Wizard',
      name: formData.fullName,
      phone: formData.phone,
      age: formData.age,
      availability: formData.availability,
      followers: formData.followers,
      monthly_views: formData.monthlyViews || 'לא צוין',
      platforms: formData.platforms
        .map((id) => platformOptions.find((item) => item.id === id)?.label)
        .filter(Boolean)
        .join(', '),
      instagram: formData.platforms.includes('instagram') ? formData.instagram : '',
      tiktok: formData.platforms.includes('tiktok') ? formData.tiktok : '',
      facebook: formData.platforms.includes('facebook') ? formData.facebook : '',
      niche: formData.niche || 'לא צוין',
      past_campaign: formData.pastCampaign || 'לא צוין',
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
      <button className="wizard__backdrop" type="button" aria-label="סגור שאלון" onClick={closeJoin} />

      <div className="wizard__panel">
        <div className="wizard__top">
          <div>
            <div className="wizard__brand">Maker · שאלון הצטרפות</div>
            <div className="wizard__count">
              שלב {step + 1} מתוך {steps.length}
            </div>
          </div>
          <button className="wizard__close" type="button" aria-label="סגור" onClick={closeJoin}>
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
            <h3>קיבלנו אותך</h3>
            <p>הפרטים נשלחו אלינו. נחזור אליך בהקדם עם הפרטים על הקמפיין.</p>
            <button className="btn btn--primary" type="button" onClick={closeJoin}>
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
                {current.id === 'contact' && (
                  <>
                    <Field
                      label="שם מלא"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      autoFocus
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
                  </>
                )}

                {current.id === 'about' && (
                  <>
                    <Field
                      label="בן כמה אתה?"
                      name="age"
                      value={formData.age}
                      onChange={(e) => updateField('age', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      type="number"
                      inputMode="numeric"
                      min="13"
                      max="100"
                      autoFocus
                      required
                    />
                    <ChoiceGroup
                      label="יש לך זמן ליצור תוכן?"
                      value={formData.availability}
                      options={availabilityOptions}
                      onChange={(value) => updateField('availability', value)}
                    />
                  </>
                )}

                {current.id === 'audience' && (
                  <>
                    <Field
                      label="כמה עוקבים יש לך בדיוק?"
                      name="followers"
                      value={formData.followers}
                      onChange={(e) => updateField('followers', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder="למשל 0, 1200, 48000"
                      autoFocus
                      required
                      large
                    />
                    <Field
                      label="כמה צפיות יש לך בחודש בעמוד?"
                      name="monthlyViews"
                      value={formData.monthlyViews}
                      onChange={(e) => updateField('monthlyViews', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      optional
                    />
                  </>
                )}

                {current.id === 'socials' && (
                  <>
                    <MultiChoiceGroup
                      label="בחר/י את הרשתות שלך"
                      values={formData.platforms}
                      options={platformOptions.map((item) => item.label)}
                      optionIds={platformOptions.map((item) => item.id)}
                      onToggle={togglePlatform}
                    />

                    {formData.platforms.includes('instagram') && (
                      <Field
                        label="שם באינסטגרם"
                        name="instagram"
                        value={formData.instagram}
                        onChange={(e) => updateField('instagram', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && goNext()}
                        placeholder="@username"
                        autoFocus
                        required
                      />
                    )}
                    {formData.platforms.includes('tiktok') && (
                      <Field
                        label="שם בטיקטוק"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={(e) => updateField('tiktok', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && goNext()}
                        placeholder="@username"
                        required
                      />
                    )}
                    {formData.platforms.includes('facebook') && (
                      <Field
                        label="פייסבוק"
                        name="facebook"
                        value={formData.facebook}
                        onChange={(e) => updateField('facebook', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && goNext()}
                        placeholder="שם או קישור לפרופיל"
                        required
                      />
                    )}
                  </>
                )}

                {current.id === 'more' && (
                  <>
                    <Field
                      label="מה הנישה שלך?"
                      name="niche"
                      value={formData.niche}
                      onChange={(e) => updateField('niche', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && goNext()}
                      placeholder="למשל: אוכל, כושר, לייף סטייל"
                      autoFocus
                      optional
                    />
                    <ChoiceGroup
                      label="עשית קמפיין בעבר?"
                      value={formData.pastCampaign}
                      options={['כן', 'לא']}
                      onChange={(value) => updateField('pastCampaign', value)}
                      optional
                      compact
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
                {submitting ? 'שולח…' : isLast ? 'שלחו והצטרפו לפול' : 'המשך'}
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
