import { useRef } from 'react'
import HandNote from '../brand/HandNote'
import MakerMark from '../brand/MakerMark'
import PillButton from '../brand/PillButton'
import { gsap, useMakerMotion } from '../brand/motion'
import { useJoin } from '../components/JoinContext'
import { useLead } from '../business/BizLeadContext'
import Cloud from './Clouds'
import usePointerDepth from './usePointerDepth'
import { finalCta } from './content'

export default function SkyFinal() {
  const root = useRef(null)
  const { openLead } = useLead()
  const { openJoin } = useJoin()
  usePointerDepth(root)

  useMakerMotion(
    () => {
      const st = { trigger: root.current, start: 'top 70%', once: true }
      gsap.from('.sk-final__title > span', { yPercent: 60, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out', scrollTrigger: st })
      gsap.from('.sk-final__mark', { scale: 0.4, rotate: -30, autoAlpha: 0, duration: 1.1, ease: 'back.out(1.6)', scrollTrigger: st })
      gsap.to('.sk-final .sk-cloud--front', {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section className="sk-final" id="contact" ref={root}>
      <Cloud kind="a" depth={0.3} className="sk-cloud--back sk-final__c1" />
      <Cloud kind="c" depth={0.4} className="sk-cloud--back sk-final__c2" flip />

      <div className="sk-final__inner">
        <div className="sk-final__mark" aria-hidden="true">
          <MakerMark size="100%" color="#fff" dotColor="var(--mk-signal)" glow />
        </div>
        <h2 className="sk-final__title">
          <span>{finalCta.title[0]}</span>
          <span>{finalCta.title[1]}</span>
        </h2>
        <p className="sk-final__text">{finalCta.text}</p>
        <div className="sk-final__actions">
          <PillButton onClick={openLead} className="sk-final__btn">
            {finalCta.cta}
          </PillButton>
          <HandNote text={finalCta.note} arrow="up" color="#fff" className="sk-final__note" />
        </div>
        <span className="sk-final__meta">{finalCta.meta}</span>
        <button type="button" className="sk-final__biz" onClick={openJoin}>
          {finalCta.creators}
        </button>
      </div>

      <Cloud kind="bank" depth={0.7} className="sk-cloud--front sk-final__bank" drift={false} />
    </section>
  )
}
