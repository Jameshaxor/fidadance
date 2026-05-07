import { motion } from 'framer-motion'
import SafeImg from './SafeImg'
import { FOUNDER_PORTRAIT, FOUNDER_PORTRAIT_WEBP } from '../assets/images'

const EASE = [0.22, 1, 0.36, 1]

const QUOTE = `Dance is not just movement; it is the deepest poetry of the soul, expressed through the body.`

// Organic, hand-tuned blob path (objectBoundingBox units, 0–1).
const BLOB_D =
  'M0.5,0.03 C0.74,0.02 0.96,0.14 0.97,0.37 C0.99,0.56 0.94,0.73 0.82,0.87 C0.68,1.00 0.48,1.02 0.28,0.95 C0.10,0.88 -0.01,0.70 0.02,0.48 C0.05,0.28 0.13,0.11 0.30,0.05 C0.37,0.02 0.43,0.02 0.5,0.03 Z'

const CREDENTIALS = [
  'Founder · Fida Dance Academy',
  'Teaching in Ranchi since inception',
]

export default function Founder() {
  return (
    <section id="founder" className="relative py-28 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-1/4 w-[28rem] h-[28rem] rounded-full bg-saffron/10 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 w-[28rem] h-[28rem] rounded-full bg-maroon/20 blur-3xl" />
      </div>

      {/* Giant Devanagari background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="devanagari text-[28vw] md:text-[18vw] leading-none text-gold select-none">
          गुरु
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[minmax(0,220px)_1fr] gap-10 md:gap-14 items-center">
          {/* Portrait — organic blob, face-centered */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto w-full max-w-[200px]"
          >
            {/* SVG defs — blob clip path */}
            <svg width="0" height="0" aria-hidden className="absolute">
              <defs>
                <clipPath id="founderBlob" clipPathUnits="objectBoundingBox">
                  <path d={BLOB_D} />
                </clipPath>
              </defs>
            </svg>

            {/* Ambient blob glow behind */}
            <div
              aria-hidden
              className="absolute -inset-6 bg-gradient-to-br from-saffron/45 via-vermillion/25 to-maroon/45 blur-3xl opacity-70"
              style={{ clipPath: 'url(#founderBlob)' }}
            />

            <div className="relative aspect-[4/5] w-full">
              {/* Gold blob border */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-gold via-saffron to-maroon"
                style={{ clipPath: 'url(#founderBlob)' }}
              />

              {/* Image — clipped to the same blob, inset slightly to reveal the gold edge */}
              <div
                className="absolute inset-[2px]"
                style={{ clipPath: 'url(#founderBlob)' }}
              >
                <SafeImg
                  src={FOUNDER_PORTRAIT}
                  webpSrc={FOUNDER_PORTRAIT_WEBP}
                  alt="Namita Sinha — Founder & Artistic Director of Fida Dance Academy"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 0%' }}
                />
                {/* Subtle tonal lift to match the site palette */}
                <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-transparent to-maroon/15 mix-blend-overlay" />
              </div>
            </div>

            {/* Name caption beneath the blob */}
            <div className="mt-5 text-center">
              <p className="devanagari text-xl text-gold leading-none">नमिता सिन्हा</p>
              <p className="text-[9px] tracking-[0.35em] uppercase text-ivory/60 mt-2">
                Founder · Artistic Director
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            <p className="eyebrow">The Vision</p>
            <h2 className="section-title mt-3">
              In her <span className="gradient-text italic">words</span>.
            </h2>

            <blockquote className="mt-10 font-display italic text-xl sm:text-2xl md:text-[1.75rem] leading-[1.4] text-ivory/90">
              {QUOTE}
            </blockquote>

            <div className="mt-10 flex items-center gap-5">
              <span aria-hidden className="h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" />
              <div>
                <p className="font-display text-2xl text-gold leading-none">Namita Sinha</p>
                <p className="text-[11px] tracking-[0.3em] uppercase text-ivory/60 mt-2">
                  Founder &amp; Artistic Director
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {CREDENTIALS.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full text-xs text-ivory/75 border border-gold/20 bg-white/[0.03]"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
