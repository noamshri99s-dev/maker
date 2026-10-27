import cloudA from '../assets/clouds/cloud-a.webp'
import cloudB from '../assets/clouds/cloud-b.webp'
import cloudC from '../assets/clouds/cloud-c.webp'
import cloudBank from '../assets/clouds/cloud-bank.webp'

const SRC = { a: cloudA, b: cloudB, c: cloudC, bank: cloudBank }

/**
 * One decorative cloud. `depth` drives pointer parallax (CSS var --d),
 * `className` places it. Wrapped twice: the outer box is free for GSAP
 * scroll transforms, the inner one carries the pointer parallax + drift.
 */
export default function Cloud({ kind = 'a', depth = 0.5, className = '', flip = false, drift = true }) {
  return (
    <div className={`sk-cloud ${className}`.trim()} aria-hidden="true">
      <div className={`sk-cloud__in ${drift ? 'sk-cloud__in--drift' : ''}`} style={{ '--d': depth }}>
        <img src={SRC[kind]} alt="" draggable="false" style={flip ? { scale: '-1 1' } : undefined} />
      </div>
    </div>
  )
}
