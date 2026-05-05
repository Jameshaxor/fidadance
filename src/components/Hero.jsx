import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, Star } from 'lucide-react'
import Mandala from './Mandala'
import SafeImg from './SafeImg'
import { HERO_DANCER } from '../assets/images'
import Magnetic from './Magnetic'
import CountUp from './CountUp'

const EASE = [0.22, 1, 0.36, 1]

// Match Tailwind `lg` breakpoint. We gate heavy scroll-driven work behind this
// so mobile devices only have to deal with a static Hero — big smoothness win.
function useIsDesktop() {
  const [v, setV] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const up = () => setV(mq.matches)
    up()
    mq.addEventListener('change', up)
    return () => mq.removeEventListener('change', up)
  }, [])
  return v
}

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1])
  // Only drive scroll-based transforms on desktop; mobile gets a static Hero.
  const parallaxStyle = isDesktop && !reduced ? { y, opacity } : undefined

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] pt-28 md:pt-36 pb-24 overflow-hidden noise-overlay"
    >
      {/* Ambient glow (static — animation removed for GPU smoothness) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-saffron/20 blur-2xl" />
        <div className="absolute top-1/3 -right-24 w-[34rem] h-[34rem] rounded-full bg-vermillion/15 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-maroon/40 blur-2xl" />
      </div>

      {/* Giant background Devanagari — slow, irregular bulb-like glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, filter: 'drop-shadow(0 0 0px rgba(245,158,43,0))' }}
        animate={
          reduced
            ? { opacity: 0.08 }
            : {
                opacity: [0.05, 0.13, 0.07, 0.05],
                filter: [
                  'drop-shadow(0 0 4px rgba(245,158,43,0.1))',
                  'drop-shadow(0 0 28px rgba(245,158,43,0.45))',
                  'drop-shadow(0 0 12px rgba(245,158,43,0.2))',
                  'drop-shadow(0 0 4px rgba(245,158,43,0.1))',
                ],
              }
        }
        transition={
          reduced
            ? { duration: 2 }
            : {
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
                // Slow inhale → bright hold → slow exhale → rest
                times: [0, 0.4, 0.7, 1],
              }
        }
        className="pointer-events-none absolute inset-x-0 top-24 md:top-16 flex justify-center"
      >
        <span className="devanagari text-[34vw] md:text-[24vw] leading-none text-saffron select-none">
          नृत्य
        </span>
      </motion.div>

      {/* Rotating mandala (CSS only — no scroll transform for smoothness) */}
      <div
        aria-hidden
        className="parallax-layer pointer-events-none absolute right-[-18%] md:right-[-8%] top-1/2 -translate-y-1/2 w-[80vw] max-w-[760px] aspect-square opacity-30 md:opacity-50"
      >
        <div className={`absolute inset-0 text-saffron/60 ${reduced ? '' : 'animate-spin-slower'}`}>
          <Mandala className="w-full h-full" />
        </div>
      </div>

      <motion.div
        style={parallaxStyle}
        className="parallax-layer relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-10 items-center"
      >
        <div className="lg:col-span-7 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="ornate-divider text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
          >
            <span>Fida Dance Academy</span>
            <span className="text-gold/40">&middot;</span>
            <span>Ranchi</span>
          </motion.div>

          <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="block text-5xl md:text-7xl lg:text-[5.5rem] text-ivory/90"
            >
              The art of
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="block text-7xl md:text-9xl lg:text-[9.5rem] italic gradient-text"
            >
              Kathak
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
              className="block text-3xl md:text-5xl lg:text-6xl text-ivory/90 mt-2"
            >
              <span className="text-gold">&mdash;</span> and so much more.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="mt-8 max-w-xl text-ivory/70 text-base md:text-lg leading-relaxed"
          >
            Ranchi&rsquo;s premier dance studio. Three disciplines &mdash; <span className="text-gold">Kathak</span>,
            Contemporary, and Urban &mdash; taught with the same care. Every <em className="font-serif italic text-ivory/85">ghungroo</em>,
            every breath, every groove &mdash; a story told in motion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Magnetic strength={0.25}>
              <a href="#classes" className="btn-primary group">
                Begin your journey
                <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#schedule" className="btn-ghost">
                <Play size={14} fill="currentColor" /> View schedule
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-14 flex items-center gap-6 md:gap-10 flex-wrap"
          >
            <Stat label="Disciplines" value={<CountUp to={3} />} sub="pathways" />
            <Divider />
            <Stat label="Students" value={<CountUp to={150} suffix="+" />} sub="and counting" />
            <Divider />
            <Stat label="Open" value="Daily" sub="till 7 PM" />
            <Divider />
            <div className="flex items-center gap-2">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" className="animate-shimmer" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <span className="text-xs text-ivory/60">Loved by the community</span>
            </div>
          </motion.div>
        </div>

        <HeroFrame reduced={reduced} />
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.5em] uppercase text-gold/60">
          <span>Scroll</span>
          <motion.div
            animate={reduced ? {} : { y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-gold/70 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}

function Divider() {
  return <div aria-hidden className="h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
}

function Stat({ label, value, sub }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">{label}</p>
      <p className="mt-1 font-display text-2xl md:text-3xl text-ivory">{value}</p>
      <p className="text-[11px] text-gold/70 mt-0.5">{sub}</p>
    </div>
  )
}

function HeroFrame({ reduced = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      className="lg:col-span-5 relative mx-auto w-full max-w-md"
    >
      {/* Glow */}
      <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-saffron/30 via-vermillion/20 to-maroon/30 blur-3xl opacity-70" />

      {/* Ornate arched frame — smooth CSS-only float (GPU-accelerated) */}
      <div className="relative aspect-[4/5] w-full parallax-layer animate-float">
        {/* Gold border ring */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-t-full rounded-b-3xl p-[1px] bg-gradient-to-b from-gold/70 via-gold/20 to-transparent"
        >
          <div className="w-full h-full rounded-t-full rounded-b-3xl bg-night/60 backdrop-blur-xl" />
        </div>

        {/* Image masked into arch */}
        <div
          className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-3xl border border-gold/25"
        >
          <SafeImg
            src={HERO_DANCER}
            alt="Kathak dancer in motion"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-maroon/20 mix-blend-overlay" />

          {/* Top Devanagari caption */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
            <p className="devanagari text-2xl text-gold/90 leading-none">नृत्य</p>
            <p className="text-[9px] tracking-[0.4em] uppercase text-ivory/70 mt-1">Nritya</p>
          </div>
        </div>

        {/* Ghungroo bells (corner decoration) */}
        <div aria-hidden className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            reduced ? (
              <span
                key={i}
                className="block w-2 h-2 rounded-full bg-gradient-to-br from-gold to-saffron shadow-[0_0_8px_rgba(245,158,43,0.7)]"
              />
            ) : (
              <motion.span
                key={i}
                className="block w-2 h-2 rounded-full bg-gradient-to-br from-gold to-saffron shadow-[0_0_8px_rgba(245,158,43,0.7)]"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.08, ease: 'easeInOut' }}
              />
            )
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        className="absolute -left-4 md:-left-10 top-10 glass-strong rounded-2xl px-4 py-3 w-44"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Since a lifetime</p>
        <p className="font-display text-lg text-ivory mt-1">Tradition, reborn.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
        className="absolute -right-3 md:-right-10 bottom-20 glass-strong rounded-2xl px-4 py-3 w-48"
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron to-maroon grid place-items-center">
            <span className="devanagari text-sm text-ivory leading-none">ता</span>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-ivory/60">Now teaching</p>
            <p className="text-sm text-ivory font-medium">Kathak · Level 1</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
