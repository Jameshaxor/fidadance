import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import Magnetic from './Magnetic'

const links = [
  { href: '#classes', label: 'Classes' },
  { href: '#instructors', label: 'Instructors' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all duration-500 ${
          scrolled ? 'glass shadow-2xl' : ''
        }`}>
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-saffron via-vermillion to-maroon grid place-items-center border border-gold/40">
              <span className="devanagari text-ivory text-base leading-none">फ</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron to-vermillion blur-md opacity-50 group-hover:opacity-90 transition" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Fida<span className="gradient-text">.</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm text-ivory/75 hover:text-ivory transition group"
              >
                {l.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-gradient-to-r from-saffron via-gold to-vermillion origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </a>
            ))}
          </nav>

          <Magnetic strength={0.3} className="hidden md:inline-flex">
            <a href="#contact" className="btn-primary !py-2 !px-5 text-sm">
              Enroll
            </a>
          </Magnetic>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden bg-ink/90 backdrop-blur-xl"
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-display text-xl font-bold">Fida<span className="gradient-text">.</span></span>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <nav className="flex flex-col items-center gap-6 mt-12">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-6">Join now</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
