import Reveal from '../components/Reveal'
import NetworkArt from '../components/NetworkArt'
import { Icon } from '../components/Icons'
import { bizDeliverables, bizSite } from './content'

export default function BizNetwork() {
  return (
    <section className="section section--tint" id="network">
      <div className="wrap">
        <div className="head center">
          <Reveal className="eyebrow" as="div">
            מה אתה מקבל
          </Reveal>
          <Reveal as="h2" className="h2">
            רשת שלמה מצלמת את המוצר שלך.
            <br />
            <span className="grad">באותו שבוע.</span>
          </Reveal>
          <Reveal className="lead" as="p" delay={70}>
            אתה לא מגייס יוצרים אחד-אחד ולא מנהל מולם מיילים. אתה פותח קמפיין אחד, ואנחנו מפעילים
            עליו את כל הרשת — {bizSite.numbers.creatorsInNetwork} יוצרים שכבר בפנים.
          </Reveal>
        </div>

        <Reveal className="network" delay={90}>
          <NetworkArt
            label="המוצר שלך"
            title="איור: רשת יוצרים שמחוברים למוצר אחד של העסק"
          />
        </Reveal>

        <div className="together">
          {bizDeliverables.map((item, i) => (
            <Reveal className="together__item biz-deliverable" key={item.title} delay={i * 90}>
              <span className="biz-deliverable__ico">
                <Icon name={item.icon} size={22} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
