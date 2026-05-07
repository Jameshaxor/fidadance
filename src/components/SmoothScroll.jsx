import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      // lerp gives frame-by-frame interpolation: feels more natural and
      // responsive than duration+easing because the page tracks the user's
      // wheel input with no fixed settling time.
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // We drive the RAF loop ourselves below so we can pause it when the
      // tab is hidden (saves CPU/battery on background tabs).
      autoRaf: false,
    })

    let rafId
    let running = !document.hidden
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    if (running) rafId = requestAnimationFrame(raf)
    const onVisibility = () => {
      if (document.hidden && running) {
        cancelAnimationFrame(rafId)
        running = false
      } else if (!document.hidden && !running) {
        running = true
        rafId = requestAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Anchor link support
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return null
}
