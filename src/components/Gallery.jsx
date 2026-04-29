import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import SafeImg from './SafeImg'
import Lightbox from './Lightbox'
import { GALLERY_IMAGES as shots } from '../assets/images'

export default function Gallery() {
  const [lbIndex, setLbIndex] = useState(null)
  const open = (i) => setLbIndex(i)
  const close = () => setLbIndex(null)
  const prev = () => setLbIndex((i) => (i - 1 + shots.length) % shots.length)
  const next = () => setLbIndex((i) => (i + 1) % shots.length)

  return (
    <section id="gallery" className="relative py-28 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow">06 — In the studio</p>
            <h2 className="section-title mt-3">Moments that <span className="gradient-text italic">move</span>.</h2>
          </div>
          <p className="max-w-md text-ivory/60">Rehearsals, recitals, showcases — a glimpse into life at Fida. Tap any frame to expand.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {shots.map((s, i) => (
            <motion.button
              type="button"
              key={i}
              onClick={() => open(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05 }}
              data-hover
              className={`relative overflow-hidden rounded-2xl group cursor-pointer text-left ${s.span}`}
            >
              <SafeImg src={s.src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass grid place-items-center text-gold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                <Maximize2 size={14} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox shots={shots} index={lbIndex} onClose={close} onPrev={prev} onNext={next} />
    </section>
  )
}
