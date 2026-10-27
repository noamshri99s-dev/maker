import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

if (typeof document !== 'undefined' && document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/**
 * Runs `setup` inside gsap.matchMedia() only when the user has not asked for
 * reduced motion. Content must already be fully visible in CSS; animations
 * may only start from a hidden state that GSAP itself sets.
 */
export function useMakerMotion(setup, { scope, dependencies = [] } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope?.current ?? undefined)
      mm.add(MOTION_OK, (context) => setup(context))
      return () => mm.revert()
    },
    { scope, dependencies },
  )
}

export { gsap, ScrollTrigger }
