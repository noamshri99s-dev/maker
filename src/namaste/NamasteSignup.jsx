import { useEffect, useState } from 'react'
import PillButton from '../brand/PillButton'
import SkyIcon from '../sky/SkyIcon'
import Jewelry from './Jewelry'
import { namasteDealPerks, namasteDealPlatforms, namasteSite } from './content'

const initialForm = {
  fullName: '',
  phone: '',
}

export default function NamasteSignup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialForm)
  const [platforms, setPlatforms] = useState([])
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const popupOpen = step >= 2

  const closePopup = () => {
    setError('')
    setStep(1)
  }

  useEffect(() => {
    if (!popupOpen) return undefined

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('nm-popup-open')

    const onKey = (event) => {
      if (event.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.body.classList.remove('nm-popup-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [popupOpen])

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const togglePlatform = (id) => {
    setPlatforms((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    setError('')
  }

  const goToDeal = (event) => {
    event.preventDefault()
    if (!formData.fullName.trim()) {
      setError('כתבי את השם המלא')
      return
    }
    if (!formData.phone.trim()) {
      setError('צריך מספר טלפון כדי שהבוט ישלח הודעה')
      return
    }
    setError('')
    setStep(2)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    if (!platforms.length) {
      setError('צריך לבחור לפחות מקום אחד להעלאה')
      return
    }

    setSubmitting(true)
    setError('')

    const selectedPlatforms = namasteDealPlatforms.filter((platform) => platforms.includes(platform.id))
    const platformLabels = selectedPlatforms.map((platform) => platform.title).join(', ')

    const payload = {
      access_key: namasteSite.web3formsAccessKey,
      subject: `Maker — קמפיין נמסטה: ${formData.fullName}`,
      from_name: 'Maker Namaste Campaign',
      name: formData.fullName,
      phone: formData.phone,
      campaign: 'נמסטה — תכשיט עבודת יד',
      pool_size: namasteSite.poolSize,
      product_value: namasteSite.productValue,
      offer: `תכשיט עבודת יד בשווי ₪${namasteSite.productValue}`,
      platforms: platformLabels,
      message: [
        'הרשמה לקמפיין נמסטה — בניית הסכם',
        '',
        `שם: ${formData.fullName}`,
        `טלפון: ${formData.phone}`,
        `ההצעה: תכשיט עבודת יד בשווי ₪${namasteSite.productValue}`,
        `העלאות: ${platformLabels}`,
        `פול: ${namasteSite.poolSize} יוצרות`,
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
      setStep(3)
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
          <p className="nm-kicker">הרשמה לפול</p>
          <h2>
            חמש יוצרות נכנסות.
            <br />
            מי שנרשמת — תופסת מקום.
          </h2>
          <p className="nm-lead">
            שם וטלפון, בונות הסכם, והבוט שולח לוואטסאפ את התדריך. ההצעה היא תכשיט עבודת יד בשווי ₪
            {namasteSite.productValue}.
          </p>
          <div className="nm-seats" aria-label="חמישה מקומות פנויים בפול">
            {Array.from({ length: namasteSite.poolSize }).map((_, index) => (
              <div className="nm-seat" key={index}>
                <strong>{index + 1}</strong>
                <span>פנוי</span>
              </div>
            ))}
          </div>
        </div>

        <div className="nm-form">
          {sent && !popupOpen ? (
            <div className="nm-done">
              <span className="nm-card__icon">
                <SkyIcon name="check" size={22} />
              </span>
              <p>נשלח</p>
              <h3>הבוט בדרך אלייך</h3>
              <p>בדקי וואטסאפ — ההסכם והתדריך מחכים שם. התכשיט בשווי ₪{namasteSite.productValue}.</p>
            </div>
          ) : (
            <form onSubmit={goToDeal} noValidate>
              <div className="nm-form__offer">
                <Jewelry className="nm-form__jewel" />
                <div>
                  <span>ההצעה על הסרטון</span>
                  <strong>תכשיט עבודת יד</strong>
                </div>
                <b>₪{namasteSite.productValue}</b>
              </div>

              <div className="nm-form__head">
                <h3>נרשמות. תופסות מקום.</h3>
                <p>שם ומספר טלפון — ואז נפתח ההסכם.</p>
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

              {error && !popupOpen ? (
                <p className="nm-error" role="alert">
                  {error}
                </p>
              ) : null}

              <PillButton type="submit" className="nm-submit">
                אני בפנים
              </PillButton>
            </form>
          )}
        </div>
      </div>

      {popupOpen ? (
        <div className="nm-popup" role="dialog" aria-modal="true" aria-labelledby="nm-deal-title">
          <button className="nm-popup__backdrop" type="button" aria-label="סגור" onClick={closePopup} />
          <div className="nm-popup__panel">
            <div className="nm-popup__top">
              <div>
                <p>Maker · קמפיין נמסטה</p>
                <strong>{formData.fullName}</strong>
              </div>
              <button className="nm-popup__close" type="button" aria-label="סגור" onClick={closePopup}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {sent ? (
              <div className="nm-done">
                <span className="nm-card__icon">
                  <SkyIcon name="check" size={22} />
                </span>
                <p>השלב הבא בוואטסאפ</p>
                <h3>הבוט שלנו שולח לך הודעה</h3>
                <p>
                  תהיי זמינה להודעה שלו. תקבלי את ההסכם ואת התדריך — תכשיט עבודת יד בשווי ₪
                  {namasteSite.productValue}.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="nm-form__offer">
                  <Jewelry className="nm-form__jewel" />
                  <div>
                    <span>ההצעה נשארת קבועה</span>
                    <strong>תכשיט עבודת יד</strong>
                  </div>
                  <b>₪{namasteSite.productValue}</b>
                </div>

                <div className="nm-form__head">
                  <h3 id="nm-deal-title">עכשיו בונות את ההסכם</h3>
                  <p>התכשיט בשווי ₪{namasteSite.productValue} הוא מה שמקבלות. בחרי איפה אפשר להעלות את הסרטון.</p>
                </div>

                <fieldset className="nm-plats">
                  <legend>
                    איפה את יכולה להעלות את הסרטון?
                    <small>לפחות אחד</small>
                  </legend>
                  <div className="nm-plats__grid">
                    {namasteDealPlatforms.map((platform) => {
                      const on = platforms.includes(platform.id)
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          className={`nm-plat ${on ? 'is-on' : ''}`}
                          aria-pressed={on}
                          onClick={() => togglePlatform(platform.id)}
                        >
                          <span className="nm-plat__check">
                            <SkyIcon name="check" size={13} stroke={2.8} />
                          </span>
                          <b>{platform.title}</b>
                          <small>{platform.text}</small>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {error ? (
                  <p className="nm-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <PillButton type="submit" className="nm-submit" disabled={submitting}>
                  {submitting ? 'שולחת…' : 'שולחת את ההסכם'}
                </PillButton>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </section>
  )
}
