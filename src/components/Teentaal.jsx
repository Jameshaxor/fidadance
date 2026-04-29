import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

// --- Teentaal (16 beats, 4 vibhags) ---
// Sam on beat 1 (gold), Khali on beat 9 (muted).
// Theka: Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha
const THEKA = [
  { bol: 'Dha',  hi: 'धा', sam: true },
  { bol: 'Dhin', hi: 'धिं' },
  { bol: 'Dhin', hi: 'धिं' },
  { bol: 'Dha',  hi: 'धा' },

  { bol: 'Dha',  hi: 'धा' },
  { bol: 'Dhin', hi: 'धिं' },
  { bol: 'Dhin', hi: 'धिं' },
  { bol: 'Dha',  hi: 'धा' },

  { bol: 'Dha',  hi: 'धा', khali: true },
  { bol: 'Tin',  hi: 'तिं' },
  { bol: 'Tin',  hi: 'तिं' },
  { bol: 'Ta',   hi: 'ता' },

  { bol: 'Ta',   hi: 'ता' },
  { bol: 'Dhin', hi: 'धिं' },
  { bol: 'Dhin', hi: 'धिं' },
  { bol: 'Dha',  hi: 'धा' },
]

// Synthesize an approximation of a tabla bol.
// Real tabla is far richer, but this conveys the rhythmic feel.
function playBol(ctx, dest, bol, khali = false, sam = false) {
  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(dest)

  // Open vs closed stroke envelope
  const isOpen = bol === 'Dha' || bol === 'Dhin'
  const attack = 0.002
  const decay = isOpen ? 0.55 : 0.22

  master.gain.setValueAtTime(0, now)
  master.gain.linearRampToValueAtTime(sam ? 1.3 : khali ? 0.55 : 1.0, now + attack)
  master.gain.exponentialRampToValueAtTime(0.001, now + attack + decay)

  // Low "baya" (bass drum) component for Dha/Dhin
  if (isOpen && !khali) {
    const bass = ctx.createOscillator()
    const bassGain = ctx.createGain()
    const bassFilter = ctx.createBiquadFilter()
    bassFilter.type = 'lowpass'
    bassFilter.frequency.value = 220
    bass.type = 'sine'
    bass.frequency.setValueAtTime(110, now)
    bass.frequency.exponentialRampToValueAtTime(55, now + 0.25)
    bassGain.gain.setValueAtTime(0.9, now)
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    bass.connect(bassFilter).connect(bassGain).connect(master)
    bass.start(now)
    bass.stop(now + 0.4)
  }

  // High "dayan" (treble) component: pitched thunk
  const pitches = {
    Dha:  [340, 520],
    Dhin: [380, 640],
    Tin:  [720, 980],
    Ta:   [540, 820],
  }
  const [f1, f2] = pitches[bol] || [500, 700]

  const o1 = ctx.createOscillator()
  const g1 = ctx.createGain()
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = f1
  bp.Q.value = 5
  o1.type = 'triangle'
  o1.frequency.setValueAtTime(f1, now)
  o1.frequency.exponentialRampToValueAtTime(f1 * 0.6, now + 0.18)
  g1.gain.setValueAtTime(0.6, now)
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
  o1.connect(bp).connect(g1).connect(master)
  o1.start(now)
  o1.stop(now + 0.25)

  // Short noise burst for the "strike"
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate)
  const data = noiseBuffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuffer
  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'highpass'
  noiseFilter.frequency.value = f2
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.25
  noise.connect(noiseFilter).connect(noiseGain).connect(master)
  noise.start(now)
}

export default function Teentaal() {
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(96)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(-1)

  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const stepRef = useRef(0)
  const timerRef = useRef(null)
  const bpmRef = useRef(bpm)
  const mutedRef = useRef(muted)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => {
    mutedRef.current = muted
    if (masterRef.current) masterRef.current.gain.value = muted ? 0 : 0.9
  }, [muted])

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      const ctx = new Ctx()
      const master = ctx.createGain()
      master.gain.value = muted ? 0 : 0.9
      master.connect(ctx.destination)
      ctxRef.current = ctx
      masterRef.current = master
    }
    return ctxRef.current
  }

  const tick = useCallback(() => {
    const ctx = ensureCtx()
    const i = stepRef.current % 16
    setCurrent(i)
    const beat = THEKA[i]
    playBol(ctx, masterRef.current, beat.bol, beat.khali, beat.sam)
    stepRef.current = i + 1
    const ms = 60000 / bpmRef.current
    timerRef.current = setTimeout(tick, ms)
  }, [])

  const start = () => {
    const ctx = ensureCtx()
    if (ctx.state === 'suspended') ctx.resume()
    stepRef.current = 0
    setPlaying(true)
    tick()
  }
  const stop = () => {
    clearTimeout(timerRef.current)
    timerRef.current = null
    setPlaying(false)
    setCurrent(-1)
  }

  useEffect(() => () => {
    clearTimeout(timerRef.current)
    ctxRef.current?.close?.()
  }, [])

  return (
    <section id="teentaal" className="relative py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow">02 — The pulse of Kathak</p>
          <h2 className="section-title mt-3">
            Feel the <span className="gradient-text italic">Teentaal</span>.
          </h2>
          <p className="mt-5 text-ivory/60 max-w-xl mx-auto">
            Sixteen beats, four vibhags. The foundational rhythm cycle of Kathak. Press play — the <span className="text-gold">sam</span> falls on beat 1, the silent <span className="text-gold">khali</span> on beat 9.
          </p>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <TaalWheel current={current} />

          <div className="glass rounded-3xl p-5 md:p-7 w-full lg:w-80">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold/70">Now playing</p>
              <p className="mt-2 devanagari text-5xl text-ivory min-h-[1em]">
                {current >= 0 ? THEKA[current].hi : 'धा'}
              </p>
              <p className="mt-1 font-display italic text-xl text-gold">
                {current >= 0 ? THEKA[current].bol : 'Teentaal'}
              </p>
              <p className="text-[11px] text-ivory/50 mt-1">
                {current >= 0
                  ? `Beat ${current + 1} of 16${THEKA[current].sam ? ' · Sam' : ''}${THEKA[current].khali ? ' · Khali' : ''}`
                  : '16-beat cycle'}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={playing ? stop : start}
                aria-label={playing ? 'Stop' : 'Play'}
                className="w-14 h-14 rounded-full grid place-items-center bg-gradient-to-br from-saffron via-vermillion to-maroon border border-gold/40 shadow-[0_10px_30px_-8px_rgba(245,158,43,0.6)] hover:scale-105 transition-transform"
              >
                {playing
                  ? <Pause size={22} fill="currentColor" className="text-ivory" />
                  : <Play size={22} fill="currentColor" className="text-ivory ml-0.5" />}
              </button>
              <button
                onClick={() => setMuted(m => !m)}
                aria-label="Toggle mute"
                className="w-11 h-11 rounded-full grid place-items-center glass hover:border-gold/50 hover:text-gold transition-colors"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-gold/70">
                <span>Laya</span>
                <span className="text-ivory">{bpm} BPM</span>
              </div>
              <input
                type="range"
                min={60}
                max={180}
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="mt-2 w-full accent-saffron"
              />
              <div className="flex justify-between text-[10px] text-ivory/40 mt-1">
                <span>Vilambit</span>
                <span>Madhya</span>
                <span>Drut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TaalWheel({ current }) {
  const wrapRef = useRef(null)
  const [size, setSize] = useState(380)

  useLayoutEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.parentElement?.clientWidth || 380
      // Cap at 420 on large screens, shrink to viewport on mobile (leave 24px padding).
      setSize(Math.max(260, Math.min(420, w - 24)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 36
  const isSmall = size < 340
  const samSize = isSmall ? 44 : 56
  const beatSize = isSmall ? 36 : 44
  return (
    <div ref={wrapRef} className="relative mx-auto" style={{ width: size, height: size, maxWidth: '100%' }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <defs>
          <radialGradient id="taalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,158,43,0.25)" />
            <stop offset="70%" stopColor="rgba(245,158,43,0)" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r + 20} fill="url(#taalGlow)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(216,168,87,0.2)" strokeDasharray="2 6" />
        {/* Vibhag separators (every 4 beats) */}
        {[0, 4, 8, 12].map((i) => {
          const a = (i / 16) * Math.PI * 2 - Math.PI / 2
          const x1 = cx + Math.cos(a) * (r - 18)
          const y1 = cy + Math.sin(a) * (r - 18)
          const x2 = cx + Math.cos(a) * (r + 18)
          const y2 = cy + Math.sin(a) * (r + 18)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(216,168,87,0.35)" strokeWidth="1.5" />
        })}
      </svg>

      {THEKA.map((beat, i) => {
        const a = (i / 16) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        const active = current === i
        const dim = beat.sam ? samSize : beatSize
        return (
          <motion.div
            key={i}
            animate={{ scale: active ? 1.18 : 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              left: `${(x / size) * 100}%`,
              top: `${(y / size) * 100}%`,
              width: dim,
              height: dim,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={[
                'relative w-full h-full rounded-full grid place-items-center transition-all duration-200',
                beat.sam
                  ? 'bg-gradient-to-br from-saffron to-vermillion text-ivory shadow-[0_0_20px_rgba(245,158,43,0.7)]'
                  : beat.khali
                  ? 'bg-ink border border-gold/30 text-ivory/40'
                  : 'bg-white/5 border border-gold/20 text-ivory/85',
                active && !beat.sam ? 'ring-2 ring-gold shadow-[0_0_16px_rgba(245,158,43,0.6)]' : '',
              ].join(' ')}
            >
              <span className={`devanagari leading-none ${isSmall ? 'text-[11px]' : 'text-sm'}`}>{beat.hi}</span>
              {beat.sam && (
                <span className="absolute -top-4 text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-gold whitespace-nowrap">Sam</span>
              )}
              {beat.khali && (
                <span className="absolute -top-4 text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-ivory/40 whitespace-nowrap">Khali</span>
              )}
            </div>
          </motion.div>
        )
      })}

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center px-10">
          <p className={`devanagari text-gold/80 leading-none ${isSmall ? 'text-4xl' : 'text-5xl md:text-6xl'}`}>तीनताल</p>
          <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-ivory/50 mt-2">16 Matras · 4 Vibhags</p>
        </div>
      </div>
    </div>
  )
}
