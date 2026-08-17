import { useState } from 'react'
import { Icon } from '../components/Icons'
import { emilySite } from './content'

const initialForm = {
  fullName: '',
  phone: '',
  instagram: '',
  tiktok: '',
  availability: '',
}

const availabilityOptions = ['יכול/ה לצלם השבוע', 'בשבוע הבא', 'גמיש']

export default function EmilySignup() {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const validate = () => {
    if (!formData.fullName.trim()) return 'כתוב/י את השם המלא'
    if (!formData.phone.trim()) return 'צריך מספר טלפון כדי שנחזור אליך'
    if (!formData.instagram.trim() && !formData.tiktok.trim()) {
      return 'כתוב/י אינסטגרם או טיקטוק — לפחות אחד'
    }
    if (!formData.availability) return 'סמן/י מתי אפשר לצלם'
    return ''
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return

    const message = validate()
    if (message) {
      setError(message)
      return
    }

    setSubmitting(true)
    setError('')

    const payload = {
      access_key: emilySite.web3formsAccessKey,
      subject: `Maker — קמפיין אמילי: ${formData.fullName}`,
      from_name: 'Maker Emily Campaign',
      name: formData.fullName,
      phone: formData.phone,
      instagram: formData.instagram || 'לא צוין',
      tiktok: formData.tiktok || 'לא צוין',
      availability: formData.availability,
      campaign: 'אמילי — סרטון UGC אחד',
      pool_size: emilySite.poolSize,
      message: [
        'הרשמה לקמפיין אמילי',
        '',
        `שם: ${formData.fullName}`,
        `טלפון: ${formData.phone}`,
        `אינסטגרם: ${formData.instagram || 'לא צוין'}`,
        `טיקטוק: ${formData.tiktok || 'לא צוין'}`,
        `זמינות לצילום: ${formData.availability}`,
        `פול: ${emilySite.poolSize} יוצרים`,
      ].join('\n'),
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

  return (
    <section className="section emily-signup" id="join">
      <div className="wrap emily-signup__grid">
        <div>
          <div className="eyebrow">הרשמה לפול</div>
          <h2 className="h2">
            חמישה יוצרים נכנסים.
            <br />
            מי שנרשם — תופס מקום.
          </h2>
          <p className="lead">
            זה קמפיין קצר: סרטון UGC אחד על אמילי, לפי תבנית שנשלח, ותשלום מהפול. אין צורך בעוקבים —
            צריך טלפון וזמינות לצלם.
          </p>

          <div className="emily-seats" aria-label="חמישה מקומות פנויים בפול">
            {Array.from({ length: emilySite.poolSize }).map((_, index) => (
              <div className="emily-seat" key={index}>
                <strong>{index + 1}</strong>
                <span>פנוי</span>
              </div>
            ))}
          </div>
        </div>

        <div className="emily-form">
          {sent ? (
            <div className="emily-form__done">
              <div className="wizard__done-icon">
                <Icon name="check" size={34} />
              </div>
              <h3>המקום נשמר</h3>
              <p>קיבלנו את ההרשמה לקמפיין אמילי. נחזור אליך עם התבנית ופרטי התשלום מהפול.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="emily-form__head">
                <h3>נרשמים לאחד מחמשת המקומות</h3>
                <p>שדות קצרים. בלי שאלון ארוך.</p>
              </div>

              <div className="wizard__fields">
                <label className="wizard__field">
                  <span>שם מלא</span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="wizard__field">
                  <span>מספר טלפון</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label className="wizard__field">
                  <span>
                    אינסטגרם
                    <small>אופציונלי אם יש טיקטוק</small>
                  </span>
                  <input
                    name="instagram"
                    value={formData.instagram}
                    onChange={(event) => updateField('instagram', event.target.value)}
                    placeholder="@username"
                    autoComplete="username"
                    inputMode="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </label>
                <label className="wizard__field">
                  <span>
                    טיקטוק
                    <small>אופציונלי אם יש אינסטגרם</small>
                  </span>
                  <input
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={(event) => updateField('tiktok', event.target.value)}
                    placeholder="@username"
                    autoComplete="off"
                    inputMode="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </label>

                <div className="wizard__choices">
                  <div className="wizard__choices-label">מתי אפשר לצלם את הסרטון?</div>
                  <div className="wizard__choice-list" role="group" aria-label="זמינות לצילום">
                    {availabilityOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`wizard__choice ${
                          formData.availability === option ? 'is-selected' : ''
                        }`}
                        onClick={() => updateField('availability', option)}
                      >
                        <span className="wizard__choice-check">
                          <Icon name="smallCheck" size={13} />
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error ? <div className="wizard__error">{error}</div> : null}

              <button
                className="btn btn--primary btn--lg emily-form__submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'שולח…' : 'שולחים ותופסים מקום'}
                {!submitting && (
                  <span className="btn__arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
