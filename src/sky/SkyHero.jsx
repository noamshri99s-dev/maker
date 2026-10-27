import { useRef } from 'react'
import PillButton from '../brand/PillButton'
import { gsap, useMakerMotion } from '../brand/motion'
import { useLead } from '../business/BizLeadContext'
import Cloud from './Clouds'
import SkyIcon from './SkyIcon'
import usePointerDepth from './usePointerDepth'
import { hero } from './content'

export default function SkyHero() {
  const root = useRef(null)
  const { openLead } = useLead()
  usePointerDepth(root)

  useMakerMotion(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.sk-hero__title > span', { y: 44, autoAlpha: 0, duration: 0.7, stagger: 0.08 })
        .from('.sk-hero__sub, .sk-hero__ctas', { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, '-=0.45')
        .from('.sk-word__rest', { y: 70, autoAlpha: 0, filter: 'blur(10px)', duration: 0.8 }, '-=0.5')
        .from('.sk-hero .sk-float', { autoAlpha: 0, filter: 'blur(8px)', duration: 0.5, stagger: 0.08 }, '-=0.45')

      // Scroll depth. The word rises faster than the cloud bank in front of
      // it, so the clouds never climb over the letters.
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.sk-hero__copy', { yPercent: -18, autoAlpha: 0.2, ease: 'none', scrollTrigger: st })
      gsap.to('.sk-word', { y: () => -window.innerHeight * 0.16, scale: 0.95, ease: 'none', scrollTrigger: st })
      gsap.to('.sk-hero .sk-cloud--back', { y: () => -window.innerHeight * 0.06, ease: 'none', scrollTrigger: st })
      gsap.to('.sk-hero .sk-cloud--front', { y: () => -window.innerHeight * 0.04, ease: 'none', scrollTrigger: st })
      gsap.to('.sk-hero .sk-float-wrap', { y: () => -window.innerHeight * 0.22, ease: 'none', scrollTrigger: st })
    },
    { scope: root },
  )

  return (
    <section className="sk-hero" id="top" ref={root}>
      <Cloud kind="c" depth={0.25} className="sk-cloud--back sk-hero__c1" />
      <Cloud kind="b" depth={0.35} className="sk-cloud--back sk-hero__c2" flip />
      <Cloud kind="a" depth={0.3} className="sk-cloud--back sk-hero__c3" />

      <div className="sk-hero__copy">
        <h1 className="sk-hero__title">
          <span>{hero.titleA}</span>
          <span>{hero.titleB}</span>
        </h1>
        <p className="sk-hero__sub">{hero.sub}</p>
        <div className="sk-hero__ctas">
          <PillButton onClick={openLead}>{hero.cta}</PillButton>
          <a className="sk-ghost" href="#work">
            {hero.secondary}
            <SkyIcon name="arrowDown" size={16} />
          </a>
        </div>
      </div>

      <div className="sk-hero__stage">
        <div className="sk-word" dir="ltr" role="img" aria-label="maker">
          {/* The whole word is real type, so the m is the same letter as the rest.
              The REC dot sits over the m like in the logo. */}
          <span className="sk-word__rest" aria-hidden="true">
            m<span className="sk-word__dot" />aker
          </span>
        </div>

        <div className="sk-float-wrap" aria-hidden="true">
          <div className="sk-float sk-float--picked" style={{ '--d': 1.1 }}>
            <span className="sk-faces-mini">
              <i>ש</i>
              <i>נ</i>
              <i>ד</i>
            </span>
            <span className="sk-float__txt">
              <b>{hero.cards.picked.title}</b>
              <small>{hero.cards.picked.meta}</small>
            </span>
          </div>

          <div className="sk-float sk-float--rec" style={{ '--d': 1.5 }}>
            <i className="sk-rec" />
            <b dir="ltr">REC 00:14</b>
          </div>

          <div className="sk-float sk-float--campaign" style={{ '--d': 0.9 }}>
            <span className="sk-float__thumb">
              <SkyIcon name="play" size={14} />
            </span>
            <span className="sk-float__txt">
              <b>{hero.cards.ready.title}</b>
              <small>{hero.cards.ready.meta}</small>
            </span>
            <span className="sk-float__ok">
              <SkyIcon name="check" size={14} stroke={2.6} />
            </span>
          </div>

          <div className="sk-float sk-float--course" style={{ '--d': 1.3 }}>
            <span className="sk-float__ico">
              <SkyIcon name="instagram" size={18} />
            </span>
            <span className="sk-float__txt">
              <b>{hero.cards.reel.title}</b>
              <small>{hero.cards.reel.meta}</small>
            </span>
          </div>
        </div>

        <Cloud kind="bank" depth={0.8} className="sk-cloud--front sk-hero__bank" drift={false} />
        <Cloud kind="b" depth={1} className="sk-cloud--front sk-hero__c4" />
      </div>
    </section>
  )
}
