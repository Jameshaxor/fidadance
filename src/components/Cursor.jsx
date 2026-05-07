import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor.
 * Position is driven by useMotionValue so mousemove events update GPU-side
 * transforms directly — ZERO React re-renders on cursor motion. Only the
 * hover/non-hover state flip (a few times per minute) goes through React.
 *
 * Rendering itself is gated behind a `(hover: hover) and (pointer: fine)`
 * media query so the cursor element never mounts on touch devices, where
 * it'd just sit stale at the last tap point.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)

  // Raw mouse coords — direct GPU values, no re-render
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  // Smoothed via spring for that "soft follow" feel
  const x = useSpring(rawX, { stiffness: 500, damping: 30, mass: 0.3 })
  const y = useSpring(rawY, { stiffness: 500, damping: 30, mass: 0.3 })

  // Decide once whether this device supports a fine pointer
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      // Subtract half the dot's size so it's centered on the pointer.
      // We update offsets directly; size changes are handled by motion's
      // animate prop on the element below.
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    const over = (e) => {
      const el = e.target
      setHover(!!el.closest && !!el.closest('a, button, [data-hover]'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [enabled, rawX, rawY])

  if (!enabled) return null

  const size = hover ? 48 : 16

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full mix-blend-difference bg-white"
      style={{
        x,
        y,
        // Center the dot on the cursor by translating back half the size.
        // Done as a CSS translate so it composes with the spring transforms
        // on the GPU without forcing a layout recalculation.
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.3 }}
    />
  )
}
