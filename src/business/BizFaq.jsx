import { useState } from 'react'
import Reveal from '../components/Reveal'
import { Icon } from '../components/Icons'
import { bizFaq } from './content'
import { useLead } from './BizLeadContext'

export default function BizFaq() {
  const [open, setOpen] = useState(0)
  const { openLead } = useLead()

  return (
    <section className="section section--tint faq" id="faq">
      <div className="wrap faq__layout">
        <div className="faq__aside">
          <Reveal className="eyebrow" as="div">
            שאלות נפוצות
          </Reveal>
          <Reveal as="h2" className="h2" delay={60}>
            כל מה ששואלים
            <br />
            לפני קמפיין ראשון.
          </Reveal>
          <Reveal className="lead" as="p" delay={110}>
            לא מצאת תשובה? מלא בריף קצר ונחזור אליך עם הכול — כולל מחיר לקמפיין.
          </Reveal>
          <Reveal delay={150}>
            <button type="button" className="btn btn--primary" onClick={openLead}>
              דברו איתי
              <span className="btn__arrow">
                <Icon name="arrow" size={18} />
              </span>
            </button>
          </Reveal>
        </div>

        <div className="faq__list">
          {bizFaq.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal
                className={`faq__item ${isOpen ? 'is-open' : ''}`}
                key={item.q}
                delay={i * 45}
              >
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <i className="faq__sign">
                    <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                  </i>
                </button>
                <div className="faq__a" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
