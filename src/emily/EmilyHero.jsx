import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon } from '../components/Icons'
import emilyPortrait from '../assets/emily.webp'
import { emilyHeroPoints, emilySite, emilyStrip } from './content'

export default function EmilyHero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.emily-hero__eyebrow', { y: 18, autoAlpha: 0, duration: 0.45 })
          .from('.emily-hero__line', { y: 36, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, '-=0.18')
          .from('.emily-hero__sub', { y: 18, autoAlpha: 0, duration: 0.5 }, '-=0.38')
          .from('.emily-hero__cta', { y: 14, autoAlpha: 0, duration: 0.45 }, '-=0.28')
          .from('.emily-hero__note span', { y: 10, autoAlpha: 0, duration: 0.35, stagger: 0.06 }, '-=0.28')
          .from(
            '.emily-hero__visual > *',
            { y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.08 },
            '-=0.7',
          )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="hero emily-hero" id="top" ref={root}>
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <div className="hero__glow hero__glow--c" />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="eyebrow emily-hero__eyebrow">
            ✦ קמפיין פתוח · {emilySite.poolSize} מקומות בפול
          </div>

          <h1>
            <span className="emily-hero__line">סרטון UGC אחד.</span>
            <br />
            <span className="emily-hero__line grad">תשלום מהפול.</span>
          </h1>

          <p className="hero__sub emily-hero__sub">
            מגייסים {emilySite.poolSize} יוצרים לצלם סרטון אחד על{' '}
            <strong className="hero__sub-em">אמילי — המזכירה החכמה בוואטסאפ</strong>. מקבלים תבנית,
            מצלמים בטלפון, והכסף יוצא מהפול.
          </p>

          <div className="hero__cta emily-hero__cta">
            <a className="btn btn--primary btn--lg" href="#join">
              {emilySite.ctaLabel}
              <span className="btn__arrow">
                <Icon name="arrow" size={20} />
              </span>
            </a>
            <a className="btn btn--outline btn--lg" href="#product">
              {emilySite.ctaSecondaryLabel}
            </a>
          </div>

          <div className="hero__note emily-hero__note">
            {emilyHeroPoints.map((point) => (
              <span key={point}>
                <i className="tick">
                  <Icon name="smallCheck" size={12} />
                </i>
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__visual emily-hero__visual">
          <div className="hero-float hero-float--a">
            <span className="hero-float__ico">
              <Icon name="users" size={16} />
            </span>
            <div>
              <strong>הפול פתוח ל־{emilySite.poolSize}</strong>
              <small>נסגר אחרי שנרשמים</small>
            </div>
          </div>

          <div className="emily-hero__stage">
            <img
              className="emily-hero__portrait"
              src={emilyPortrait}
              alt="אמילי, המזכירה החכמה בוואטסאפ"
              width="480"
              height="480"
            />
            <div className="emily-hero__card" aria-hidden="true">
              <div className="emily-hero__card-top">
                <span className="emily-hero__online" />
                אמילי · מקוונת
              </div>
              <p>כל שיחה מוקלטת, מתומללת ומסוכמת. אוטומטית.</p>
            </div>
          </div>

          <div className="hero-float hero-float--b">
            <span className="hero-float__ico hero-float__ico--pay">
              <Icon name="money" size={16} />
            </span>
            <div>
              <strong>סרטון אחד בתשלום</strong>
              <small>מהפול, אחרי אישור</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="wrap hero-strip__inner">
          {emilyStrip.map((item) => (
            <div className="hero-strip__item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
