import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Animate a number counting up from 0 to `to` when the component mounts.
 * Optionally waits until the element enters the viewport (via native IO),
 * with a safety fallback so the value never gets stuck at 0 on mobile.
 */
export default function CountUp({ to = 100, duration = 1400, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) {
      setN(to)
      return
    }

    let raf
    let started = false
    const start = (t0) => {
      if (started) return
      started = true
      const begin = t0 ?? performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - begin) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setN(Math.round(eased * to))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // Preferred path: start the moment the element touches the viewport.
    let observer
    if (ref.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start()
            observer.disconnect()
          }
        },
        { threshold: 0.01 }
      )
      observer.observe(ref.current)
    }

    // Safety net: if IO never fires (old Safari, hidden tab, etc.), still animate.
    const fallback = setTimeout(() => start(), 600)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
      observer?.disconnect()
    }
  }, [to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}{n}{suffix}
    </span>
  )
}
