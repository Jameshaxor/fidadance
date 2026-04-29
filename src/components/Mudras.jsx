import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Eight of the 28 Asamyukta Hastas (single-hand gestures) from the Natya Shastra,
// core to Kathak's vocabulary of Abhinaya.
const MUDRAS = [
  {
    hi: 'पताक',
    name: 'Pataka',
    meaning: 'The Flag',
    desc: 'Fingers extended, thumb bent. The foundational gesture — open, declarative.',
    represents: ['Clouds', 'Forest', 'Denial', 'Waves', 'Blessing'],
  },
  {
    hi: 'त्रिपताक',
    name: 'Tripataka',
    meaning: 'Three parts of the flag',
    desc: 'Pataka with the ring finger bent down. A regal, crown-like shape.',
    represents: ['Crown', 'Tree', 'Arrow', 'Lamp', 'Vajra'],
  },
  {
    hi: 'अर्धचन्द्र',
    name: 'Ardhachandra',
    meaning: 'Half moon',
    desc: 'Fingers straight, thumb stretched perpendicular — a crescent silhouette.',
    represents: ['Moon', 'Neck', 'Plate', 'Anxiety', 'Prayer'],
  },
  {
    hi: 'कर्तरीमुख',
    name: 'Kartarimukha',
    meaning: 'Face of scissors',
    desc: 'Index and middle fingers apart; ring and little bent into the palm.',
    represents: ['Separation', 'Lightning', 'Falling', 'Creeper', 'Death'],
  },
  {
    hi: 'मयूर',
    name: 'Mayura',
    meaning: 'The peacock',
    desc: 'Ring finger touches the thumb tip; other fingers extended outward.',
    represents: ['Peacock', 'Forehead mark', 'Vomiting', 'Creeper', 'Famous'],
  },
  {
    hi: 'अलपद्म',
    name: 'Alapadma',
    meaning: 'The fully-bloomed lotus',
    desc: 'Fingers spread open in a spiral, rooted from the base of the palm.',
    represents: ['Lotus', 'Beauty', 'Longing', 'Praise', 'Fullness'],
  },
  {
    hi: 'हंसास्य',
    name: 'Hamsasya',
    meaning: 'Mouth of the swan',
    desc: 'Thumb and index tips meet; other fingers gently extended.',
    represents: ['Swan', 'Pearl', 'Wisdom', 'Instruction', 'Subtlety'],
  },
  {
    hi: 'मुष्टि',
    name: 'Mushti',
    meaning: 'The fist',
    desc: 'Fingers folded in, thumb pressed across them — grounded strength.',
    represents: ['Steadiness', 'Grasping', 'Combat', 'Hair', 'Resolve'],
  },
]

// Small stylised SVG silhouette per mudra — suggestive, not anatomical.
function HandGlyph({ kind, className = '' }) {
  const shapes = {
    Pataka:       'M50 90 L50 25 M40 90 L40 28 M60 90 L60 28 M70 90 L70 32 M30 80 Q25 70 32 60',
    Tripataka:    'M50 90 L50 25 M40 90 L40 28 M60 90 L60 30 M70 75 Q72 62 66 50 M30 80 Q25 70 32 60',
    Ardhachandra: 'M50 90 L50 28 M40 90 L40 28 M60 90 L60 28 M70 90 L70 28 M28 75 Q18 65 22 45',
    Kartarimukha: 'M42 90 L42 24 M54 90 L54 22 M66 85 Q72 72 66 60 M74 85 Q80 74 72 62 M28 80 Q22 70 30 60',
    Mayura:       'M40 90 L40 30 M50 90 L50 28 M60 90 Q62 55 72 44 Q78 38 72 36 Q66 36 62 40 M70 90 L70 36 M30 80 Q25 70 32 60',
    Alapadma:     'M50 92 Q42 78 36 58 M50 92 Q50 72 44 50 M50 92 Q58 74 62 52 M50 92 Q66 76 72 56 M50 92 Q30 80 24 60',
    Hamsasya:     'M50 90 L50 45 Q50 34 42 32 Q36 36 40 42 M40 90 L40 30 M60 90 L60 28 M70 90 L70 30 M30 80 Q25 70 32 60',
    Mushti:       'M32 78 Q28 64 36 56 Q48 52 60 56 Q72 60 72 72 Q70 82 60 84 Q44 86 32 78 M58 58 Q62 48 58 42',
  }
  const d = shapes[kind] || shapes.Pataka
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* wrist/palm base */}
      <path d="M28 90 Q50 100 72 90" strokeWidth="2" opacity="0.6" />
      <path d={d} />
    </svg>
  )
}

export default function Mudras() {
  const [active, setActive] = useState(0)
  const m = MUDRAS[active]

  return (
    <section id="mudras" className="relative py-28 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow">05 — Hasta Mudras</p>
            <h2 className="section-title mt-3">The alphabet of <span className="gradient-text italic">Kathak</span>.</h2>
          </div>
          <p className="max-w-md text-ivory/60">
            Every story begins at the hands. These single-hand gestures — <em className="italic text-ivory/80">asamyukta hastas</em> — are the vocabulary through which a Kathak dancer speaks.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          {/* Big hero mudra */}
          <motion.div
            layout
            className="relative glass rounded-3xl aspect-square max-w-lg mx-auto w-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-maroon/20" />
            <div aria-hidden className="absolute inset-6 rounded-2xl border border-gold/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={m.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="text-center px-8">
                  <HandGlyph kind={m.name} className="w-40 h-40 md:w-56 md:h-56 mx-auto text-gold" />
                  <p className="devanagari text-3xl md:text-4xl text-ivory mt-6">{m.hi}</p>
                  <p className="font-display italic text-2xl md:text-3xl gradient-text mt-1">{m.name}</p>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mt-2">{m.meaning}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Corner ornament */}
            <div aria-hidden className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-gold/60">
              Mudra {String(active + 1).padStart(2, '0')} / 08
            </div>
            <div aria-hidden className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] uppercase text-ivory/40">
              Asamyukta Hasta
            </div>
          </motion.div>

          {/* Details + grid of choices */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={m.name + '-desc'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display italic text-xl md:text-2xl text-ivory/90 leading-relaxed">
                  “{m.desc}”
                </p>

                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70">Represents</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.represents.map((r) => (
                      <span
                        key={r}
                        className="px-3 py-1.5 rounded-full text-xs text-ivory/80 border border-gold/20 bg-white/[0.03]"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-4 gap-2">
              {MUDRAS.map((x, i) => {
                const on = i === active
                return (
                  <button
                    key={x.name}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={[
                      'group relative aspect-square rounded-2xl border transition-all duration-500 overflow-hidden',
                      on
                        ? 'border-gold/60 bg-gradient-to-br from-saffron/15 to-maroon/15 shadow-[0_8px_30px_-10px_rgba(245,158,43,0.5)]'
                        : 'border-white/10 hover:border-gold/30 bg-white/[0.02]',
                    ].join(' ')}
                    aria-label={`${x.name} — ${x.meaning}`}
                  >
                    <HandGlyph
                      kind={x.name}
                      className={`w-full h-full p-3 transition-colors duration-500 ${on ? 'text-gold' : 'text-ivory/50 group-hover:text-gold/80'}`}
                    />
                    <span className="absolute bottom-1.5 inset-x-0 text-center devanagari text-[10px] text-ivory/70">
                      {x.hi}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
