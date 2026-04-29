import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      const el = e.target
      setHover(!!el.closest('a, button, [data-hover]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] rounded-full mix-blend-difference hidden md:block"
        animate={{
          x: pos.x - (hover ? 24 : 8),
          y: pos.y - (hover ? 24 : 8),
          width: hover ? 48 : 16,
          height: hover ? 48 : 16,
          backgroundColor: '#fff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.3 }}
      />
    </>
  )
}
