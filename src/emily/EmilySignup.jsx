import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icons'
import {
  emilyDealEdit,
  emilyDealPerks,
  emilyDealPlatforms,
  emilySite,
} from './content'

const initialForm = {
  fullName: '',
  phone: '',
}

function calcPayout(editsVideo, platforms) {
  const extras =
    (editsVideo ? emilyDealEdit.amount : 0) +
    emilyDealPlatforms
      .filter((platform) => platforms.includes(platform.id))
      .reduce((sum, platform) => sum + platform.amount, 0)
  return emilySite.payoutBase + extras
}

function useAnimatedNumber(value) {
  const [shown, setShown] = useState(value)
  const shownRef = useRef(value)

  useEffect(() => {
    const from = shownRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || from === value) {
      shownRef.current = value
      setShown(value)
      return undefined
    }

    const start = performance.now()
    let raf
    const tick = (now) => {
      const progress = Math.min((now - start) / 340, 1)
      const eased = 1 - (1 - progress) ** 3
      const next = Math.round(from + (value - from) * eased)
      shownRef.current = next
      setShown(next)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return shown
}

function MoneyPops({ pops }) {
  if (!pops.length) return null
  return (
    <div className="emily-pops" aria-hidden="true">
      {pops.map((pop) => (
        <span className={`emily-pop ${pop.amount < 0 ? 'is-minus' : ''}`} key={pop.id}>
          {pop.amount > 0 ? '+' : ''}
          {pop.amount} ₪
        </span>
      ))}
    </div>
  )
}

function PayoutMeter({ payout, bump }) {
  const shown = useAnimatedNumber(payout)
  const fill = Math.max(
    0,
    Math.min(1, (payout - emilySite.payoutBase) / (emilySite.payoutMax - emilySite.payoutBase)),
  )

  return (
    <div className={`emily-meter ${bump ? 'is-bump' : ''}`}>
      <div className="emily-meter__top">
        <span>כמה תעשי מזה עכשיו</span>
        <em>פוטנציאל ₪{emilySite.payoutMax}</em>
      </div>
      <div className="emily-meter__value">₪{shown.toLocaleString('he-IL')}</div>
      <div className="emily-meter__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${fill || 0.04})` }} />
      </div>
      <div className="emily-meter__row">
        <span>בסיס הסרטון ₪{emilySite.payoutBase}</span>
        <span>
          {payout >= emilySite.payoutMax
            ? 'הגעת למקסימום'
            : `עוד ₪${emilySite.payoutMax - payout} אם מאשרים הכל`}
        </span>
      </div>
    </div>
  )
}

export default function EmilySignup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialForm)
  const [editsVideo, setEditsVideo] = useState(false)
  const [platforms, setPlatforms] = useState([])
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [pops, setPops] = useState([])
  const [bump, setBump] = useState(false)
  const popId = useRef(0)

  const payout = calcPayout(editsVideo, platforms)
  const popupOpen = step >= 2

  const closePopup = () => {
    setError('')
    setStep(1)
  }

  useEffect(() => {
    if (!popupOpen) return undefined

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('emily-popup-open')

    const onKey = (event) => {
      if (event.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.body.classList.remove('emily-popup-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [popupOpen])

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const spawnPop = (amount) => {
    if (!amount) return
    const id = popId.current + 1
    popId.current = id
    setPops((current) => [...current, { id, amount }])
    setBump(true)
    window.setTimeout(() => {
      setPops((current) => current.filter((pop) => pop.id !== id))
    }, 900)
    window.setTimeout(() => setBump(false), 280)
  }

  const toggleEdit = () => {
    const next = !editsVideo
    setEditsVideo(next)
    spawnPop(next ? emilyDealEdit.amount : -emilyDealEdit.amount)
    setError('')
  }

  const togglePlatform = (id, amount) => {
    const on = platforms.includes(id)
    setPlatforms((current) => (on ? current.filter((item) => item !== id) : [...current, id]))
    spawnPop(on ? -amount : amount)
    setError('')
  }

  const goToDeal = (event) => {
    event.preventDefault()
    if (!formData.fullName.trim()) {
      setError('כתוב/י את השם המלא')
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

    const selectedPlatforms = emilyDealPlatforms.filter((platform) =>
      platforms.includes(platform.id),
    )
    const platformLabels = selectedPlatforms.map((platform) => platform.title).join(', ')

    const payload = {
      access_key: emilySite.web3formsAccessKey,
      subject: `Maker — קמפיין אמילי: ${formData.fullName}`,
      from_name: 'Maker Emily Campaign',
      name: formData.fullName,
      phone: formData.phone,
      campaign: 'אמילי — סרטון UGC אחד',
      pool_size: emilySite.poolSize,
      payout,
      payout_base: emilySite.payoutBase,
      video_edit: editsVideo ? `כן (+₪${emilyDealEdit.amount})` : 'לא',
      platforms: platformLabels,
      message: [
        'הרשמה לקמפיין אמילי — בניית הסכם',
        '',
        `שם: ${formData.fullName}`,
        `טלפון: ${formData.phone}`,
        `תשלום מההסכם: ₪${payout}`,
        `בסיס: ₪${emilySite.payoutBase}`,
        `עורכת סרטון: ${editsVideo ? `כן (+₪${emilyDealEdit.amount})` : 'לא'}`,
        `העלאות: ${platformLabels}`,
        ...selectedPlatforms.map((platform) => `  · ${platform.title} +₪${platform.amount}`),
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
      setStep(3)
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
            שם וטלפון, בונים הסכם, והבוט שולח לוואטסאפ את התדריך. בסיס ₪{emilySite.payoutBase} — עד ₪
            {emilySite.payoutMax} אם מאשרים יותר.
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

        <div className="emily-form emily-deal">
          {sent && !popupOpen ? (
            <div className="emily-form__done emily-bot">
              <div className="emily-bot__pulse" aria-hidden="true">
                <Icon name="phone" size={28} />
              </div>
              <p className="emily-bot__kicker">נשלח</p>
              <h3>הבוט בדרך אלייך</h3>
              <p>בדקו וואטסאפ — ההסכם והתדריך מחכים שם. תשלום מההסכם: ₪{payout}.</p>
            </div>
          ) : (
            <form onSubmit={goToDeal} noValidate>
              <div className="emily-jackpot">
                <span>פוטנציאל לקמפיין</span>
                <strong>₪{emilySite.payoutMax}</strong>
              </div>

              <div className="emily-form__head">
                <h3>נרשמים. תופסים מקום.</h3>
                <p>שם ומספר טלפון — ואז נפתח ההסכם.</p>
              </div>

              <div className="emily-perks">
                {emilyDealPerks.map((perk) => (
                  <div className="emily-perk" key={perk.title}>
                    <b>{perk.title}</b>
                    <span>{perk.text}</span>
                  </div>
                ))}
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
              </div>

              {error && !popupOpen ? <div className="wizard__error">{error}</div> : null}

              <button className="btn btn--primary btn--lg emily-form__submit" type="submit">
                אני בפנים
                <span className="btn__arrow">
                  <Icon name="arrow" size={18} />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>

      {popupOpen ? (
        <div className="wizard emily-popup" role="dialog" aria-modal="true" aria-labelledby="emily-deal-title">
          <button
            className="wizard__backdrop"
            type="button"
            aria-label="סגור"
            onClick={closePopup}
          />
          <div className="wizard__panel emily-popup__panel">
            <MoneyPops pops={pops} />
            <div className="emily-popup__top">
              <div>
                <div className="wizard__brand">Maker · קמפיין אמילי</div>
                <div className="wizard__count">{formData.fullName}</div>
              </div>
              <button className="wizard__close" type="button" aria-label="סגור" onClick={closePopup}>
                <Icon name="x" size={18} />
              </button>
            </div>

            {sent ? (
              <div className="emily-form__done emily-bot">
                <div className="emily-bot__pulse" aria-hidden="true">
                  <Icon name="phone" size={28} />
                </div>
                <p className="emily-bot__kicker">השלב הבא בוואטסאפ</p>
                <h3>הבוט שלנו שולח לכם הודעה</h3>
                <p>
                  תהיו זמינים להודעה שלו. תקבלו את ההסכם ואת התדריך — לפי מה שאישרתם פה, כולל תשלום
                  של ₪{payout}.
                </p>
                <div className="emily-bot__payout">ההסכם שלך: ₪{payout}</div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <PayoutMeter payout={payout} bump={bump} />

                <div className="emily-form__head">
                  <h3 id="emily-deal-title">עכשיו אנחנו בונים את ההסכם</h3>
                  <p className="emily-form__hint">
                    ככל שאתה מאשר יותר דברים, סיכוי גבוה יותר שתקבל את הקמפיין.
                  </p>
                </div>

                <button
                  type="button"
                  className={`emily-add ${editsVideo ? 'is-on' : ''}`}
                  onClick={toggleEdit}
                >
                  <span className="emily-add__check">
                    <Icon name="smallCheck" size={14} />
                  </span>
                  <span className="emily-add__copy">
                    <b>{emilyDealEdit.title}</b>
                    <small>{emilyDealEdit.text}</small>
                  </span>
                  <span className="emily-add__cash">+₪{emilyDealEdit.amount}</span>
                </button>

                <div className="emily-plats">
                  <div className="emily-plats__label">
                    איפה אתה יכול להעלות את הסרטון?
                    <small>לפחות אחד</small>
                  </div>
                  <p className="emily-plats__base">
                    בלי לחיצות — בסיס הסרטון הוא ₪{emilySite.payoutBase}. כל מקום שמוסיפים, מוסיף כסף.
                  </p>
                  <div className="emily-plats__grid">
                    {emilyDealPlatforms.map((platform) => {
                      const on = platforms.includes(platform.id)
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          className={`emily-plat ${on ? 'is-on' : ''}`}
                          onClick={() => togglePlatform(platform.id, platform.amount)}
                        >
                          <span className="emily-plat__check">
                            <Icon name="smallCheck" size={13} />
                          </span>
                          <b>{platform.title}</b>
                          <small>{platform.text}</small>
                          <em>+₪{platform.amount}</em>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {error ? <div className="wizard__error">{error}</div> : null}

                <button
                  className="btn btn--primary btn--lg emily-form__submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'שולח…' : 'בוא נתחיל'}
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
      ) : null}
    </section>
  )
}
