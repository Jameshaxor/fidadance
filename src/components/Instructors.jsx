import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import SafeImg from './SafeImg'
import { INSTRUCTOR_IMAGES } from '../assets/images'

const team = [
  { name: 'Namita Sinha', role: 'Founder · Artistic Director', img: INSTRUCTOR_IMAGES.namita, credits: 'Visionary behind Fida Dance Academy', pos: '50% 0%' },
  { name: 'Classical Faculty', role: 'Kathak \u00b7 Bharatanatyam', img: INSTRUCTOR_IMAGES.classical, credits: 'Traditionally trained gurus' },
  { name: 'Contemporary Faculty', role: 'Modern \u00b7 Expressionistic', img: INSTRUCTOR_IMAGES.contemporary, credits: 'Stage performers & educators' },
  { name: 'Urban Faculty', role: 'Hip-Hop \u00b7 Street styles', img: INSTRUCTOR_IMAGES.urban, credits: 'Industry-trained choreographers' },
]

export default function Instructors() {
  return (
    <section id="instructors" className="relative py-28 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow">03 — Faculty</p>
            <h2 className="section-title mt-3">Taught by <span className="gradient-text italic">legends</span>.</h2>
          </div>
          <p className="max-w-md text-ivory/60">Led by <span className="text-gold">Namita Sinha</span>, our faculty are working performers — gurus and choreographers who live the craft daily.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              data-hover
              className="group relative rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <SafeImg src={t.img} alt={t.name} loading="lazy" style={{ objectPosition: t.pos || 'center' }} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{t.role}</p>
                  <h3 className="font-display text-2xl md:text-3xl font-medium mt-1 text-ivory">{t.name}</h3>
                  <p className="text-xs text-ivory/50 mt-1">{t.credits}</p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all">
                    <a href="#" className="inline-flex items-center gap-2 text-sm text-gold hover:text-saffron transition-colors">
                      <Instagram size={16} /> Follow
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
