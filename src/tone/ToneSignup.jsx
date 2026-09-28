import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icons'
import toneImage from '../assets/tone.png'
import { toneDealEdit, toneDealPerks, toneDealPlatforms, toneSite } from './content'

const initialForm = {
  fullName: '',
  phone: '',
}

function calcTotal(editsVideo, platforms) {
  const extras =
    (editsVideo ? toneDealEdit.amount : 0) +
    toneDealPlatforms
      .filter((platform) => platforms.includes(platform.id))
      .reduce((sum, platform) => sum + platform.amount, 0)
  return toneSite.productValue + extras
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

function ValueMeter({ total, bump }) {
  const shown = useAnimatedNumber(total)
  const fill = Math.max(
    0,
    Math.min(1, (total - toneSite.productValue) / (toneSite.payoutMax - toneSite.productValue)),
  )

  return (
    <div className={`emily-meter ${bump ? 'is-bump' : ''}`}>
      <div className="emily-meter__top">
        <span>השווי הכולל שלך בקמפיין</span>
        <em>פוטנציאל ₪{toneSite.payoutMax}</em>
      </div>
      <div className="emily-meter__value">₪{shown.toLocaleString('he-IL')}</div>
      <div className="emily-meter__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${fill || 0.04})` }} />
      </div>
      <div className="emily-meter__row">
        <span>המוצר בשווי ₪{toneSite.productValue}</span>
        <span>
          {total >= toneSite.payoutMax
            ? 'הגעת למקסימום'
            : `עוד ₪${toneSite.payoutMax - total} אם מאשרים הכל`}
        </span>
      </div>
    </div>
  )
}

export default function ToneSignup() {
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

  const total = calcTotal(editsVideo, platforms)
  const cash = total - toneSite.productValue
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
    spawnPop(next ? toneDealEdit.amount : -toneDealEdit.amount)
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

    const selectedPlatforms = toneDealPlatforms.filter((platform) =>
      platforms.includes(platform.id),
    )
    const platformLabels = selectedPlatforms.map((platform) => platform.title).join(', ')

    const payload = {
      access_key: toneSite.web3formsAccessKey,
      subject: `Maker — קמפיין tone.: ${formData.fullName}`,
      from_name: 'Maker tone. Campaign',
      name: formData.fullName,
      phone: formData.phone,
      campaign: 'tone. formula 04 — סרטון UGC אחד',
      pool_size: toneSite.poolSize,
      total_value: total,
      product_value: toneSite.productValue,
      cash_payout: cash,
      video_edit: editsVideo ? `כן (+₪${toneDealEdit.amount})` : 'לא',
      platforms: platformLabels,
      message: [
        'הרשמה לקמפיין tone. formula 04 — בניית הסכם',
        '',
        `שם: ${formData.fullName}`,
        `טלפון: ${formData.phone}`,
        `שווי כולל מההסכם: ₪${total}`,
        `מוצר: tone. formula 04 (שווי ₪${toneSite.productValue})`,
        `תשלום בכסף: ₪${cash}`,
        `עורכת סרטון: ${editsVideo ? `כן (+₪${toneDealEdit.amount})` : 'לא'}`,
        `העלאות: ${platformLabels}`,
        ...selectedPlatforms.map((platform) => `  · ${platform.title} +₪${platform.amount}`),
        `פול: ${toneSite.poolSize} יוצרות`,
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
    <section className="section emily-signup" id="join">
      <div className="wrap emily-signup__grid">
        <div>
          <div className="eyebrow">הרשמה לפול</div>
          <h2 className="h2">
            חמש יוצרות נכנסות.
            <br />
            מי שנרשמת — תופסת מקום.
          </h2>
          <p className="lead">
            שם וטלפון, בונים הסכם, והבוט שולח לוואטסאפ את התדריך. המוצר נשלח אלייך הביתה.
          </p>

          <div className="emily-seats" aria-label="חמישה מקומות פנויים בפול">
            {Array.from({ length: toneSite.poolSize }).map((_, index) => (
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
              <p>בדקי וואטסאפ — ההסכם והתדריך מחכים שם.</p>
            </div>
          ) : (
            <form onSubmit={goToDeal} noValidate>
              <div className="emily-jackpot">
                <span>פוטנציאל לקמפיין</span>
                <strong>₪{toneSite.payoutMax}</strong>
                <div className="tone-jackpot__product">
                  <img src={toneImage} alt="tone. formula 04" width="56" height="56" />
                  <b>+ מוצר בשווי ₪{toneSite.productValue}</b>
                </div>
              </div>

              <div className="emily-form__head">
                <h3>נרשמות. תופסות מקום.</h3>
                <p>שם ומספר טלפון — ואז נפתח ההסכם.</p>
              </div>

              <div className="emily-perks">
                {toneDealPerks.map((perk) => (
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
        <div className="wizard emily-popup" role="dialog" aria-modal="true" aria-labelledby="tone-deal-title">
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
                <div className="wizard__brand">Maker · קמפיין tone.</div>
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
                <h3>הבוט שלנו שולח לך הודעה</h3>
                <p>
                  תהיי זמינה להודעה שלו. תקבלי את ההסכם, את התדריך ואת פרטי המשלוח של המוצר — לפי מה
                  שאישרת פה.
                </p>
                <div className="emily-bot__payout">ההסכם שלך: שווי ₪{total}</div>
                <p className="tone-deal__split">
                  מוצר בשווי ₪{toneSite.productValue}
                  {cash > 0 ? ` + ₪${cash} בתשלום` : ''}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <ValueMeter total={total} bump={bump} />

                <div className="emily-form__head">
                  <h3 id="tone-deal-title">עכשיו אנחנו בונים את ההסכם</h3>
                  <p className="emily-form__hint">
                    ככל שאת מאשרת יותר דברים, סיכוי גבוה יותר שתקבלי את הקמפיין.
                  </p>
                </div>

                <div className="tone-deal__product">
                  <span className="tone-deal__product-ico">
                    <Icon name="bag" size={18} />
                  </span>
                  <span>
                    <b>tone. formula 04 נשלח אלייך</b>
                    <small>צנצנת 30 כמוסות — כלול בהסכם</small>
                  </span>
                  <em>₪{toneSite.productValue}</em>
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
                    <b>{toneDealEdit.title}</b>
                    <small>{toneDealEdit.text}</small>
                  </span>
                  <span className="emily-add__cash">+₪{toneDealEdit.amount}</span>
                </button>

                <div className="emily-plats">
                  <div className="emily-plats__label">
                    איפה את יכולה להעלות את הסרטון?
                    <small>לפחות אחד</small>
                  </div>
                  <p className="emily-plats__base">
                    בלי לחיצות — מקבלות את המוצר בשווי ₪{toneSite.productValue}. כל מקום שמוסיפים, מוסיף
                    כסף.
                  </p>
                  <div className="emily-plats__grid">
                    {toneDealPlatforms.map((platform) => {
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
                  {submitting ? 'שולח…' : 'בואו נתחיל'}
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
