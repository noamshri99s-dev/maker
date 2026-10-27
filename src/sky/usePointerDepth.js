import { useEffect } from 'react'

/**
 * Writes smoothed pointer position (-1..1) into --px / --py on `ref`.
 * Children use `translate3d(calc(var(--px) * var(--d) * …))` for depth.
 * Off under reduced motion and on touch-only devices.
 */
export default function usePointerDepth(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return

    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf = 0
    let running = false

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.07
      cur.y += (target.y - cur.y) * 0.07
      el.style.setProperty('--px', cur.x.toFixed(4))
      el.style.setProperty('--py', cur.y.toFixed(4))
      if (Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001) raf = requestAnimationFrame(tick)
      else running = false
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref])
}
