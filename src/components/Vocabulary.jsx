import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDownUp, Waves, RotateCw, ArrowDown, Pause, Feather, Minimize2, Sparkles,
  Lock, Zap, Snowflake, Music, MoveHorizontal,
} from 'lucide-react'

/* =========================================================
   VOCABULARY EXPLORER
   Three disciplines, three vocabularies. Equal weight.
   =========================================================*/

// ---- Kathak: Asamyukta Hastas (single-hand mudras) ----
const KATHAK = [
  {
    hi: 'पताक', name: 'Pataka', meaning: 'The Flag',
    desc: 'Fingers extended, thumb bent. The foundational gesture — open, declarative.',
    represents: ['Clouds', 'Forest', 'Denial', 'Waves', 'Blessing'],
  },
  {
    hi: 'त्रिपताक', name: 'Tripataka', meaning: 'Three parts of the flag',
    desc: 'Pataka with the ring finger bent down. A regal, crown-like shape.',
    represents: ['Crown', 'Tree', 'Arrow', 'Lamp', 'Vajra'],
  },
  {
    hi: 'अर्धचन्द्र', name: 'Ardhachandra', meaning: 'Half moon',
    desc: 'Fingers straight, thumb stretched perpendicular — a crescent silhouette.',
    represents: ['Moon', 'Neck', 'Plate', 'Anxiety', 'Prayer'],
  },
  {
    hi: 'कर्तरीमुख', name: 'Kartarimukha', meaning: 'Face of scissors',
    desc: 'Index and middle fingers apart; ring and little bent into the palm.',
    represents: ['Separation', 'Lightning', 'Falling', 'Creeper', 'Death'],
  },
  {
    hi: 'मयूर', name: 'Mayura', meaning: 'The peacock',
    desc: 'Ring finger touches the thumb tip; other fingers extended outward.',
    represents: ['Peacock', 'Forehead mark', 'Vomiting', 'Creeper', 'Famous'],
  },
  {
    hi: 'अलपद्म', name: 'Alapadma', meaning: 'The fully-bloomed lotus',
    desc: 'Fingers spread open in a spiral, rooted from the base of the palm.',
    represents: ['Lotus', 'Beauty', 'Longing', 'Praise', 'Fullness'],
  },
  {
    hi: 'हंसास्य', name: 'Hamsasya', meaning: 'Mouth of the swan',
    desc: 'Thumb and index tips meet; other fingers gently extended.',
    represents: ['Swan', 'Pearl', 'Wisdom', 'Instruction', 'Subtlety'],
  },
  {
    hi: 'मुष्टि', name: 'Mushti', meaning: 'The fist',
    desc: 'Fingers folded in, thumb pressed across them — grounded strength.',
    represents: ['Steadiness', 'Grasping', 'Combat', 'Hair', 'Resolve'],
  },
]

// ---- Contemporary: foundational principles from Graham / Limón / Humphrey ----
const CONTEMP = [
  {
    name: 'Contraction',
    meaning: 'The body folds inward',
    desc: 'Breath expelled, spine curves, the core gathers. Martha Graham\u2019s signature — a storm held inside.',
    represents: ['Grief', 'Focus', 'Tension', 'Intention', 'Power'],
    icon: Minimize2,
  },
  {
    name: 'Release',
    meaning: 'Opening outward',
    desc: 'The breath returns, the spine unfurls. Release is not collapse — it is trust in space.',
    represents: ['Breath', 'Trust', 'Sky', 'Letting go', 'Arrival'],
    icon: Feather,
  },
  {
    name: 'Spiral',
    meaning: 'Rotation through the core',
    desc: 'Jos\u00e9 Lim\u00f3n\u2019s principle: the torso rotates against the hips, creating inevitability of motion.',
    represents: ['Turning', 'Momentum', 'Inevitability', 'Vortex', 'Breath'],
    icon: RotateCw,
  },
  {
    name: 'Fall & Recovery',
    meaning: 'Gravity as partner',
    desc: 'Doris Humphrey\u2019s arc: we surrender to gravity, meet the ground, and rise anew. Life in one movement.',
    represents: ['Gravity', 'Surrender', 'Rebirth', 'Risk', 'Resilience'],
    icon: ArrowDown,
  },
  {
    name: 'Suspension',
    meaning: 'The breath before',
    desc: 'The held moment at the apex of a jump, a lift, a reach. All potential, no resolution.',
    represents: ['Anticipation', 'Stillness', 'Potential', 'Lightness', 'Silence'],
    icon: Pause,
  },
  {
    name: 'Weight Shift',
    meaning: 'The dance of balance',
    desc: 'Transferring mass through the feet, the hips, the spine. Every step begins here.',
    represents: ['Balance', 'Intention', 'Travel', 'Ground', 'Pulse'],
    icon: MoveHorizontal,
  },
  {
    name: 'Floor Work',
    meaning: 'Finding lift from below',
    desc: 'The floor is not a fall — it is a surface to push against. The ground becomes partner.',
    represents: ['Gravity', 'Roll', 'Slide', 'Push', 'Origin'],
    icon: ArrowDownUp,
  },
  {
    name: 'Articulation',
    meaning: 'Part from part',
    desc: 'Isolating the head from the ribs, the ribs from the hips. The body as a chain of voices.',
    represents: ['Detail', 'Isolation', 'Clarity', 'Nuance', 'Voice'],
    icon: Sparkles,
  },
]

// ---- Hip-Hop: the foundations ----
const HIPHOP = [
  {
    name: 'Bounce',
    meaning: 'The vertical groove',
    desc: 'Every hip-hop step lives here. The knees breathe, the chest rides — before you move, you bounce.',
    represents: ['Groove', 'Pulse', 'Ride', 'Breath', 'Base'],
    icon: ArrowDownUp,
  },
  {
    name: 'Rock',
    meaning: 'Side to side',
    desc: 'Weight shifts laterally on the beat. The base of uprock, the soul of swaying in place.',
    represents: ['Sway', 'Swing', 'Uprock', 'Pendulum', 'Flow'],
    icon: MoveHorizontal,
  },
  {
    name: 'Groove',
    meaning: 'Your signature in rhythm',
    desc: 'Every dancer\u2019s groove is personal. It\u2019s what you do inside the beat — the part no one can teach.',
    represents: ['Character', 'Feel', 'Personal', 'Swing', 'Identity'],
    icon: Music,
  },
  {
    name: 'Lock',
    meaning: 'The sudden freeze',
    desc: 'A sharp, held stop mid-movement. Don Campbell invented it by accident and named a style.',
    represents: ['Stop', 'Precision', 'Comic', 'Sharp', 'Timing'],
    icon: Lock,
  },
  {
    name: 'Wave',
    meaning: 'Energy through the body',
    desc: 'A ripple that travels joint to joint. Fingertip to shoulder, shoulder to opposite fingertip.',
    represents: ['Ripple', 'Flow', 'Isolation', 'Current', 'Ease'],
    icon: Waves,
  },
  {
    name: 'Pop',
    meaning: 'Flex on the beat',
    desc: 'A sharp contract-release of specific muscles on a downbeat. Hits like a shutter.',
    represents: ['Snap', 'Funk', 'Accent', 'Robot', 'Pop-and-lock'],
    icon: Zap,
  },
  {
    name: 'Slide',
    meaning: 'Gliding transition',
    desc: 'Feet move, the upper body floats. The ancestor of the moonwalk, the soul of smoothness.',
    represents: ['Glide', 'Smooth', 'Moonwalk', 'Illusion', 'Style'],
    icon: MoveHorizontal,
  },
  {
    name: 'Freeze',
    meaning: 'Held mid-flow',
    desc: 'Stopping the body in an improbable shape — a punctuation mark at the end of a phrase.',
    represents: ['Pose', 'Break', 'Punctuation', 'Shape', 'Power'],
    icon: Snowflake,
  },
]

const TABS = {
  kathak: {
    label: 'Kathak',
    subtitle: 'Asamyukta Hastas',
    data: KATHAK,
    isMudra: true,
    palette: 'from-saffron via-vermillion to-maroon',
    ring: 'border-gold/60',
    glow: 'shadow-[0_8px_30px_-10px_rgba(245,158,43,0.5)]',
    bg: 'from-saffron/15 to-maroon/15',
  },
  contemporary: {
    label: 'Contemporary',
    subtitle: 'Principles of Movement',
    data: CONTEMP,
    isMudra: false,
    palette: 'from-sky-400 via-indigo-500 to-purple-600',
    ring: 'border-indigo-300/60',
    glow: 'shadow-[0_8px_30px_-10px_rgba(129,140,248,0.5)]',
    bg: 'from-indigo-500/15 to-purple-600/15',
  },
  hiphop: {
    label: 'Hip-Hop',
    subtitle: 'Foundational Moves',
    data: HIPHOP,
    isMudra: false,
    palette: 'from-lime-400 via-emerald-500 to-teal-600',
    ring: 'border-emerald-300/60',
    glow: 'shadow-[0_8px_30px_-10px_rgba(52,211,153,0.5)]',
    bg: 'from-emerald-500/15 to-teal-600/15',
  },
}

// --- Kathak hand glyphs (stylized line-art per mudra) ---
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
      <path d="M28 90 Q50 100 72 90" strokeWidth="2" opacity="0.6" />
      <path d={d} />
    </svg>
  )
}

export default function Vocabulary() {
  const [tab, setTab] = useState('kathak')
  const [active, setActive] = useState(0)
  const T = TABS[tab]
  const item = T.data[active]

  const setTabSafe = (key) => {
    setTab(key)
    setActive(0)
  }

  return (
    <section id="vocabulary" className="relative py-28 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow">05 — The vocabulary</p>
            <h2 className="section-title mt-3">Every form has its <span className="gradient-text italic">alphabet</span>.</h2>
          </div>
          <p className="max-w-md text-ivory/60">
            Kathak speaks through mudras. Contemporary through breath and weight. Hip-hop through groove and freeze. Three languages, one studio.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="glass rounded-full p-1 inline-flex">
            {Object.entries(TABS).map(([key, t]) => {
              const on = key === tab
              return (
                <button
                  key={key}
                  onClick={() => setTabSafe(key)}
                  className={[
                    'relative px-4 md:px-6 py-2 rounded-full text-xs md:text-sm tracking-wide transition-colors',
                    on ? 'text-ivory' : 'text-ivory/60 hover:text-ivory',
                  ].join(' ')}
                >
                  {on && (
                    <motion.span
                      layoutId="vocab-tab-pill"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${T.palette}`}
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          {/* Hero glyph card */}
          <motion.div
            layout
            className="relative glass rounded-3xl aspect-square max-w-lg mx-auto w-full overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${T.bg}`} />
            <div aria-hidden className="absolute inset-6 rounded-2xl border border-gold/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={tab + '-' + item.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
              >
                <div className="flex flex-col items-center justify-center text-center w-full">
                  {T.isMudra ? (
                    <HandGlyph
                      kind={item.name}
                      className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 text-gold"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 grid place-items-center">
                      <item.icon
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-gold"
                        strokeWidth={1.2}
                      />
                    </div>
                  )}
                  {item.hi && (
                    <p className="devanagari text-2xl sm:text-3xl md:text-4xl text-ivory mt-3 md:mt-5 leading-none">
                      {item.hi}
                    </p>
                  )}
                  <p
                    className={[
                      'font-display italic gradient-text leading-[1.1]',
                      item.hi
                        ? 'mt-1 text-xl sm:text-2xl md:text-3xl'
                        : 'mt-3 md:mt-5 text-2xl sm:text-3xl md:text-4xl',
                    ].join(' ')}
                  >
                    {item.name}
                  </p>
                  <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold/70 mt-2">
                    {item.meaning}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div aria-hidden className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-gold/60">
              {String(active + 1).padStart(2, '0')} / {String(T.data.length).padStart(2, '0')}
            </div>
            <div aria-hidden className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] uppercase text-ivory/40">
              {T.subtitle}
            </div>
          </motion.div>

          {/* Details + thumb grid */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab + '-' + item.name + '-desc'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display italic text-xl md:text-2xl text-ivory/90 leading-relaxed">
                  “{item.desc}”
                </p>

                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70">Represents</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.represents.map((r) => (
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
              {T.data.map((x, i) => {
                const on = i === active
                return (
                  <button
                    key={x.name}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={[
                      'group relative aspect-square rounded-2xl border transition-all duration-500 overflow-hidden',
                      on
                        ? `${T.ring} bg-gradient-to-br ${T.bg} ${T.glow}`
                        : 'border-white/10 hover:border-gold/30 bg-white/[0.02]',
                    ].join(' ')}
                    aria-label={`${x.name} — ${x.meaning}`}
                  >
                    {T.isMudra ? (
                      <HandGlyph
                        kind={x.name}
                        className={`w-full h-full p-3 transition-colors duration-500 ${on ? 'text-gold' : 'text-ivory/50 group-hover:text-gold/80'}`}
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center">
                        <x.icon
                          className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-500 ${on ? 'text-gold' : 'text-ivory/50 group-hover:text-gold/80'}`}
                          strokeWidth={1.4}
                        />
                      </div>
                    )}
                    <span className="absolute bottom-1.5 inset-x-0 text-center text-[9px] tracking-wider uppercase text-ivory/70 truncate px-1">
                      {x.hi || x.name}
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
