import { useState } from 'react'
import PillButton from '../brand/PillButton'
import SkyIcon from '../sky/SkyIcon'
import Jewelry from './Jewelry'
import { namasteDealPerks, namasteLegal, namasteSite } from './content'

const initialForm = {
  instagram: '',
  fullName: '',
  phone: '',
}

export default function NamasteSignup() {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    if (!formData.instagram.trim()) {
      setError('כתבי את האינסטגרם')
      return
    }
    if (!formData.fullName.trim()) {
      setError('כתבי את השם המלא')
      return
    }
    if (!formData.phone.trim()) {
      setError('צריך מספר טלפון')
      return
    }

    setSubmitting(true)
    setError('')

    const payload = {
      access_key: namasteSite.web3formsAccessKey,
      subject: `Maker — קמפיין נמסטה: ${formData.fullName}`,
      from_name: 'Maker Namaste Campaign',
      name: formData.fullName,
      phone: formData.phone,
      instagram: formData.instagram.trim(),
      campaign: 'נמסטה — מועמדות בלבד',
      pool_size: namasteSite.poolSize,
      product_value: namasteSite.productValue,
      status: 'בקשת מועמדות. אין אישור לקמפיין ואין זכאות לתכשיט.',
      message: [
        'מועמדות לקמפיין נמסטה — לא אישור ולא מתנה',
        '',
        `אינסטגרם: ${formData.instagram.trim()}`,
        `שם: ${formData.fullName}`,
        `טלפון: ${formData.phone}`,
        'סטטוס: בקשה להיכלל בפול בלבד',
        `התמורה, רק אחרי אישור והשלמה: תכשיט עבודת יד בשווי ₪${namasteSite.productValue}`,
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
      setError('משהו השתבש בשליחה. נסי שוב בעוד רגע.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="nm-signup" id="join">
      <div className="nm-signup__grid">
        <div>
          <p className="nm-kicker">מועמדות בלבד</p>
          <h2>
            נרשמות למקום.
            <br />
            לא מקבלות תכשיט.
          </h2>
          <p className="nm-lead">
            אינסטגרם, שם וטלפון. זה כל מה שנאסף. ההרשמה היא הזמנה אפשרית להיכנס לקמפיין, לא מתנה
            ולא זכאות לתכשיט בשווי ₪{namasteSite.productValue}.
          </p>
          <div className="nm-seats" aria-label="עד חמישה מקומות בקמפיין, בכפוף לאישור">
            {Array.from({ length: namasteSite.poolSize }).map((_, index) => (
              <div className="nm-seat" key={index}>
                <strong>{index + 1}</strong>
                <span>לא מובטח</span>
              </div>
            ))}
          </div>
        </div>

        <div className="nm-form">
          {sent ? (
            <div className="nm-done">
              <span className="nm-card__icon">
                <SkyIcon name="check" size={22} />
              </span>
              <p>הבקשה נקלטה</p>
              <h3>זו לא הזמנה לקמפיין</h3>
              <p>
                אין בזה זכאות לתכשיט. אם יישמר לך מקום, נחזור אלייך בוואטסאפ עם הזמנה. עד אז לא אושר
                דבר.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="nm-form__offer">
                <Jewelry className="nm-form__jewel" />
                <div>
                  <span>תמורה רק אחרי אישור</span>
                  <strong>תכשיט עבודת יד</strong>
                </div>
                <b>₪{namasteSite.productValue}</b>
              </div>

              <div className="nm-form__head">
                <h3>מגישות מועמדות.</h3>
                <p>אינסטגרם, שם ומספר טלפון. בלי אישור לקמפיין.</p>
              </div>

              <ul className="nm-perks">
                {namasteDealPerks.map((perk) => (
                  <li key={perk.title}>
                    <b>{perk.title}</b>
                    <span>{perk.text}</span>
                  </li>
                ))}
              </ul>

              <div className="nm-fields">
                <label className="nm-field">
                  <span>אינסטגרם</span>
                  <input
                    name="instagram"
                    dir="ltr"
                    inputMode="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="@username"
                    value={formData.instagram}
                    onChange={(event) => updateField('instagram', event.target.value)}
                    autoComplete="username"
                    required
                  />
                </label>
                <label className="nm-field">
                  <span>שם מלא</span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="nm-field">
                  <span>מספר טלפון</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
              </div>

              {error ? (
                <p className="nm-error" role="alert">
                  {error}
                </p>
              ) : null}

              <p className="nm-legal">{namasteLegal}</p>

              <PillButton type="submit" className="nm-submit" disabled={submitting}>
                {submitting ? 'שולחת…' : 'מגישה מועמדות'}
              </PillButton>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
