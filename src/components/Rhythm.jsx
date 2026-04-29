import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

/* =========================================================
   RHYTHM PLAYER
   Three styles, one player. Each style has its own:
     - 16-position beat pattern
     - synthesized sound per beat kind
     - center title + tempo defaults
   =========================================================*/

// ---- Kathak Teentaal: Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha ----
const BEATS_KATHAK = [
  { kind: 'Dha', label: 'धा', accent: 'sam' },
  { kind: 'Dhin', label: 'धिं' },
  { kind: 'Dhin', label: 'धिं' },
  { kind: 'Dha', label: 'धा' },
  { kind: 'Dha', label: 'धा' },
  { kind: 'Dhin', label: 'धिं' },
  { kind: 'Dhin', label: 'धिं' },
  { kind: 'Dha', label: 'धा' },
  { kind: 'Dha', label: 'धा', accent: 'khali' },
  { kind: 'Tin', label: 'तिं' },
  { kind: 'Tin', label: 'तिं' },
  { kind: 'Ta', label: 'ता' },
  { kind: 'Ta', label: 'ता' },
  { kind: 'Dhin', label: 'धिं' },
  { kind: 'Dhin', label: 'धिं' },
  { kind: 'Dha', label: 'धा' },
]

// ---- Contemporary 8-count (16 eighth-notes, numbers on beats, & on off-beats) ----
// Downbeats 1 and 5 are accented; the "&" off-beats play a softer tick.
const BEATS_CONTEMP = [
  { kind: 'down', label: '1', accent: 'sam' },
  { kind: 'off',  label: '&' },
  { kind: 'num',  label: '2' },
  { kind: 'off',  label: '&' },
  { kind: 'num',  label: '3' },
  { kind: 'off',  label: '&' },
  { kind: 'num',  label: '4' },
  { kind: 'off',  label: '&' },
  { kind: 'down', label: '5', accent: 'khali' }, // "turn" of the phrase
  { kind: 'off',  label: '&' },
  { kind: 'num',  label: '6' },
  { kind: 'off',  label: '&' },
  { kind: 'num',  label: '7' },
  { kind: 'off',  label: '&' },
  { kind: 'num',  label: '8' },
  { kind: 'off',  label: '&' },
]

// ---- Hip-Hop 4/4 boom-bap pattern (16 sixteenths) ----
// Kick on 1/5/9/13, Snare on 3/7/11/15, Hat on all evens.
const BEATS_HIPHOP = [
  { kind: 'Kick',  label: 'K', accent: 'sam' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Snare', label: 'S' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Kick',  label: 'K' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Snare', label: 'S' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Kick',  label: 'K', accent: 'khali' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Snare', label: 'S' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Kick',  label: 'K' },
  { kind: 'Hat',   label: 'h' },
  { kind: 'Snare', label: 'S' },
  { kind: 'Hat',   label: 'h' },
]

const STYLES = {
  kathak: {
    label: 'Kathak',
    hi: 'कथक',
    cycleName: 'Teentaal',
    cycleHi: 'तीनताल',
    subtitle: '16 Matras · 4 Vibhags',
    blurb: 'The foundational rhythm of Kathak. Sixteen beats, four vibhags. The sam falls on beat 1, the silent khali on beat 9.',
    bpm: { min: 60, max: 180, default: 96, marks: ['Vilambit', 'Madhya', 'Drut'] },
    beats: BEATS_KATHAK,
    palette: { from: 'from-saffron', via: 'via-vermillion', to: 'to-maroon' },
  },
  contemporary: {
    label: 'Contemporary',
    hi: 'समकालीन',
    cycleName: '8-Count',
    cycleHi: '1 2 3 4',
    subtitle: 'Phrasing · Breath · Release',
    blurb: 'The universal language of modern dance. Eight counts to shape a phrase — each with room to contract, suspend, release.',
    bpm: { min: 60, max: 160, default: 100, marks: ['Adagio', 'Moderato', 'Allegro'] },
    beats: BEATS_CONTEMP,
    palette: { from: 'from-sky-400', via: 'via-indigo-500', to: 'to-purple-600' },
  },
  hiphop: {
    label: 'Hip-Hop',
    hi: 'हिप-हॉप',
    cycleName: '4/4 Boom-Bap',
    cycleHi: 'Boom Bap',
    subtitle: '16 Steps · Kick · Snare · Hat',
    blurb: 'The backbone of hip-hop. Four to the floor, snare on the two and four, hats on every eighth. Head-nod guaranteed.',
    bpm: { min: 70, max: 140, default: 92, marks: ['Chill', 'Boom', 'Hyped'] },
    beats: BEATS_HIPHOP,
    palette: { from: 'from-lime-400', via: 'via-emerald-500', to: 'to-teal-600' },
  },
}

/* ---------------- Web Audio synth per style ---------------- */
function playKathak(ctx, dest, beat) {
  const now = ctx.currentTime
  const khali = beat.accent === 'khali'
  const sam = beat.accent === 'sam'
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(dest)

  const isOpen = beat.kind === 'Dha' || beat.kind === 'Dhin'
  const attack = 0.002
  const decay = isOpen ? 0.55 : 0.22
  master.gain.setValueAtTime(0, now)
  master.gain.linearRampToValueAtTime(sam ? 1.3 : khali ? 0.55 : 1.0, now + attack)
  master.gain.exponentialRampToValueAtTime(0.001, now + attack + decay)

  if (isOpen && !khali) {
    const bass = ctx.createOscillator()
    const bassGain = ctx.createGain()
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'; lp.frequency.value = 220
    bass.type = 'sine'
    bass.frequency.setValueAtTime(110, now)
    bass.frequency.exponentialRampToValueAtTime(55, now + 0.25)
    bassGain.gain.setValueAtTime(0.9, now)
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    bass.connect(lp).connect(bassGain).connect(master)
    bass.start(now); bass.stop(now + 0.4)
  }

  const pitches = { Dha: [340, 520], Dhin: [380, 640], Tin: [720, 980], Ta: [540, 820] }
  const [f1, f2] = pitches[beat.kind] || [500, 700]

  const o1 = ctx.createOscillator()
  const g1 = ctx.createGain()
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'; bp.frequency.value = f1; bp.Q.value = 5
  o1.type = 'triangle'
  o1.frequency.setValueAtTime(f1, now)
  o1.frequency.exponentialRampToValueAtTime(f1 * 0.6, now + 0.18)
  g1.gain.setValueAtTime(0.6, now)
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
  o1.connect(bp).connect(g1).connect(master)
  o1.start(now); o1.stop(now + 0.25)

  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
  const n = ctx.createBufferSource(); n.buffer = buf
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = f2
  const ng = ctx.createGain(); ng.gain.value = 0.25
  n.connect(hp).connect(ng).connect(master)
  n.start(now)
}

function playContemp(ctx, dest, beat) {
  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(dest)

  const down = beat.kind === 'down'
  const off = beat.kind === 'off'
  const amp = down ? 1.0 : off ? 0.25 : 0.55
  const dur = 0.09

  master.gain.setValueAtTime(0, now)
  master.gain.linearRampToValueAtTime(amp, now + 0.004)
  master.gain.exponentialRampToValueAtTime(0.001, now + dur)

  // Wood-block-ish tone
  const o = ctx.createOscillator()
  const og = ctx.createGain()
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'; bp.Q.value = 8
  const pitch = down ? 880 : off ? 540 : 720
  bp.frequency.value = pitch
  o.type = 'triangle'
  o.frequency.value = pitch
  og.gain.setValueAtTime(0.7, now)
  og.gain.exponentialRampToValueAtTime(0.001, now + dur)
  o.connect(bp).connect(og).connect(master)
  o.start(now); o.stop(now + dur + 0.02)

  // Snap / clap character for downbeats
  if (down) {
    const bufLen = Math.floor(ctx.sampleRate * 0.05)
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
    const n = ctx.createBufferSource(); n.buffer = buf
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800
    const ng = ctx.createGain(); ng.gain.value = 0.5
    n.connect(hp).connect(ng).connect(master)
    n.start(now)
  }
}

function playHipHop(ctx, dest, beat) {
  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(dest)

  if (beat.kind === 'Kick') {
    master.gain.setValueAtTime(0, now)
    master.gain.linearRampToValueAtTime(beat.accent === 'sam' ? 1.3 : 1.0, now + 0.003)
    master.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

    const o = ctx.createOscillator()
    const og = ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(120, now)
    o.frequency.exponentialRampToValueAtTime(40, now + 0.18)
    og.gain.setValueAtTime(1, now)
    og.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
    o.connect(og).connect(master)
    o.start(now); o.stop(now + 0.3)
  } else if (beat.kind === 'Snare') {
    master.gain.setValueAtTime(0, now)
    master.gain.linearRampToValueAtTime(0.9, now + 0.002)
    master.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

    // Noise body
    const bufLen = Math.floor(ctx.sampleRate * 0.16)
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
    const n = ctx.createBufferSource(); n.buffer = buf
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.8
    const ng = ctx.createGain(); ng.gain.value = 0.8
    n.connect(bp).connect(ng).connect(master)
    n.start(now)

    // Tonal crack
    const o = ctx.createOscillator()
    const og = ctx.createGain()
    o.type = 'triangle'
    o.frequency.setValueAtTime(240, now)
    o.frequency.exponentialRampToValueAtTime(160, now + 0.08)
    og.gain.setValueAtTime(0.5, now)
    og.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
    o.connect(og).connect(master)
    o.start(now); o.stop(now + 0.12)
  } else {
    // Hat — short high-passed noise
    master.gain.setValueAtTime(0, now)
    master.gain.linearRampToValueAtTime(0.35, now + 0.001)
    master.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    const bufLen = Math.floor(ctx.sampleRate * 0.05)
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
    const n = ctx.createBufferSource(); n.buffer = buf
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000
    const ng = ctx.createGain(); ng.gain.value = 0.7
    n.connect(hp).connect(ng).connect(master)
    n.start(now)
  }
}

const PLAYERS = { kathak: playKathak, contemporary: playContemp, hiphop: playHipHop }

/* ---------------- Component ---------------- */
export default function Rhythm() {
  const [style, setStyle] = useState('kathak')
  const S = STYLES[style]

  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(S.bpm.default)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(-1)

  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const stepRef = useRef(0)
  const timerRef = useRef(null)
  const bpmRef = useRef(bpm)
  const styleRef = useRef(style)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { styleRef.current = style }, [style])
  useEffect(() => {
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
    const s = styleRef.current
    const beats = STYLES[s].beats
    const i = stepRef.current % beats.length
    setCurrent(i)
    PLAYERS[s](ctx, masterRef.current, beats[i])
    stepRef.current = i + 1
    const subdivision = s === 'kathak' ? 1 : s === 'contemporary' ? 0.5 : 0.5
    // For kathak, each position is a full matra. For others, each position is a 1/2 beat.
    const ms = (60000 / bpmRef.current) * subdivision
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

  const switchStyle = (key) => {
    if (key === style) return
    stop()
    setStyle(key)
    setBpm(STYLES[key].bpm.default)
  }

  useEffect(() => () => {
    clearTimeout(timerRef.current)
    ctxRef.current?.close?.()
  }, [])

  const currentBeat = current >= 0 ? S.beats[current] : null

  return (
    <section id="rhythm" className="relative py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow">02 — The pulse</p>
          <h2 className="section-title mt-3">
            Every dance has its <span className="gradient-text italic">rhythm</span>.
          </h2>
          <p className="mt-5 text-ivory/60 max-w-xl mx-auto">
            Pick a discipline. Press play. Feel how each form counts time — tabla bols, contemporary phrasing, or boom-bap swing.
          </p>
        </div>

        {/* Style tabs */}
        <div className="flex justify-center mb-10">
          <div className="glass rounded-full p-1 inline-flex">
            {Object.entries(STYLES).map(([key, s]) => {
              const on = key === style
              return (
                <button
                  key={key}
                  onClick={() => switchStyle(key)}
                  className={[
                    'relative px-4 md:px-6 py-2 rounded-full text-xs md:text-sm tracking-wide transition-colors',
                    on ? 'text-ivory' : 'text-ivory/60 hover:text-ivory',
                  ].join(' ')}
                >
                  {on && (
                    <motion.span
                      layoutId="rhythm-tab-pill"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.palette.from} ${s.palette.via} ${s.palette.to} shadow-[0_6px_20px_-6px_rgba(245,158,43,0.5)]`}
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <BeatWheel style={S} current={current} />

          <div className="glass rounded-3xl p-5 md:p-7 w-full lg:w-80">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold/70">Now playing</p>
              <p className={`mt-2 text-ivory min-h-[1em] ${style === 'kathak' ? 'devanagari text-5xl' : 'font-display italic text-4xl'}`}>
                {currentBeat ? currentBeat.label : (style === 'kathak' ? 'धा' : style === 'contemporary' ? '1' : 'K')}
              </p>
              <p className="mt-1 font-display italic text-xl text-gold">
                {currentBeat ? (currentBeat.kind || '—') : S.cycleName}
              </p>
              <p className="text-[11px] text-ivory/50 mt-1">
                {currentBeat
                  ? `Step ${current + 1} of ${S.beats.length}${currentBeat.accent === 'sam' ? ' · Downbeat' : ''}${currentBeat.accent === 'khali' ? ' · Turn' : ''}`
                  : S.subtitle}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={playing ? stop : start}
                aria-label={playing ? 'Stop' : 'Play'}
                className={`w-14 h-14 rounded-full grid place-items-center bg-gradient-to-br ${S.palette.from} ${S.palette.via} ${S.palette.to} border border-gold/30 shadow-[0_10px_30px_-8px_rgba(245,158,43,0.5)] hover:scale-105 transition-transform`}
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
                <span>Tempo</span>
                <span className="text-ivory">{bpm} BPM</span>
              </div>
              <input
                type="range"
                min={S.bpm.min}
                max={S.bpm.max}
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="mt-2 w-full accent-saffron"
              />
              <div className="flex justify-between text-[10px] text-ivory/40 mt-1">
                {S.bpm.marks.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-ivory/50 border-t border-white/5 pt-4">
              {S.blurb}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Palette hex values used for the sam-beat gradient (SVG cannot consume
// Tailwind classes directly, so we mirror the palette here).
const SAM_GRADIENTS = {
  Kathak:       ['#f59e2b', '#d63a2a', '#6b1324'], // saffron → vermillion → maroon
  Contemporary: ['#38bdf8', '#6366f1', '#9333ea'], // sky-400 → indigo-500 → purple-600
  'Hip-Hop':    ['#a3e635', '#10b981', '#0d9488'], // lime-400 → emerald-500 → teal-600
}

function BeatWheel({ style, current }) {
  const beats = style.beats
  const n = beats.length

  // All geometry lives inside the SVG's 0..100 viewBox. Dots are <g> inside
  // the same SVG as the dotted circle — one coordinate system, one renderer,
  // so the two can never drift by a subpixel at any viewport size.
  const cx = 50
  const cy = 50
  const ringR = 42
  const glowR = 50
  const vibhagIn = ringR - 5
  const vibhagOut = ringR + 5
  const samR = 4.6       // sam dot radius (viewBox units)
  const beatR = 3.4      // regular beat dot radius
  const fontSize = 2.6   // label font size in viewBox units
  const gradient = SAM_GRADIENTS[style.label] || SAM_GRADIENTS.Kathak
  const gradId = `sam-${style.label}`
  const glowId = `glow-${style.label}`

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,158,43,0.22)" />
            <stop offset="70%" stopColor="rgba(245,158,43,0)" />
          </radialGradient>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={gradient[0]} />
            <stop offset="50%"  stopColor={gradient[1]} />
            <stop offset="100%" stopColor={gradient[2]} />
          </linearGradient>
        </defs>

        {/* Soft centered glow */}
        <circle cx={cx} cy={cy} r={glowR} fill={`url(#${glowId})`} />

        {/* The dotted circle */}
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke="rgba(216,168,87,0.25)"
          strokeDasharray="0.6 1.8"
          strokeWidth="0.3"
        />

        {/* Vibhag separators — placed BETWEEN vibhags */}
        {[0, 1, 2, 3].map((k) => {
          const p = (k * (n / 4) - 0.5) / n
          const a = p * Math.PI * 2 - Math.PI / 2
          const x1 = cx + Math.cos(a) * vibhagIn
          const y1 = cy + Math.sin(a) * vibhagIn
          const x2 = cx + Math.cos(a) * vibhagOut
          const y2 = cy + Math.sin(a) * vibhagOut
          return (
            <line
              key={k}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="rgba(216,168,87,0.4)"
              strokeWidth="0.35"
              strokeLinecap="round"
            />
          )
        })}

        {/* Center label */}
        <text
          x={cx}
          y={cy - 1.5}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(216,168,87,0.85)"
          style={{
            fontFamily: style.label === 'Kathak' ? '"Tiro Devanagari Hindi", serif' : '"Cormorant Garamond", serif',
            fontStyle: style.label === 'Kathak' ? 'normal' : 'italic',
            fontSize: style.label === 'Kathak' ? 12 : 9,
            fontWeight: 500,
          }}
        >
          {style.cycleHi}
        </text>
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(244,234,210,0.5)"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 1.8,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          {style.subtitle}
        </text>

        {/* Beat dots — every dot's center sits EXACTLY on the dotted circle */}
        {beats.map((beat, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(a) * ringR
          const y = cy + Math.sin(a) * ringR
          const active = current === i
          const isSam = beat.accent === 'sam'
          const isKhali = beat.accent === 'khali'
          const r = isSam ? samR : beatR

          let fill, stroke, strokeWidth, textFill, filter
          if (isSam) {
            fill = `url(#${gradId})`
            stroke = 'rgba(216,168,87,0.45)'
            strokeWidth = 0.25
            textFill = '#f4ead2'
            filter = 'drop-shadow(0 0 1.2px rgba(245,158,43,0.6))'
          } else if (isKhali) {
            fill = '#0a0610'
            stroke = 'rgba(216,168,87,0.3)'
            strokeWidth = 0.25
            textFill = 'rgba(244,234,210,0.4)'
          } else {
            fill = 'rgba(255,255,255,0.05)'
            stroke = 'rgba(216,168,87,0.25)'
            strokeWidth = 0.25
            textFill = 'rgba(244,234,210,0.85)'
          }
          if (active && !isSam) {
            stroke = '#d8a857'
            strokeWidth = 0.5
            filter = 'drop-shadow(0 0 1px rgba(245,158,43,0.55))'
          }

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={active ? r * 1.18 : r}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                style={{
                  filter,
                  transition: 'r 0.14s ease-out, stroke 0.2s, stroke-width 0.2s',
                }}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={textFill}
                style={{
                  fontFamily: style.label === 'Kathak' ? '"Tiro Devanagari Hindi", serif' : '"Cormorant Garamond", serif',
                  fontStyle: style.label === 'Kathak' ? 'normal' : 'italic',
                  fontSize: fontSize,
                  fontWeight: isSam ? 600 : 500,
                  pointerEvents: 'none',
                }}
              >
                {beat.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
