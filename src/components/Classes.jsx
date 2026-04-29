import { motion } from 'framer-motion'
import { Flame, Sparkles, Crown } from 'lucide-react'
import SafeImg from './SafeImg'
import { CLASS_IMAGES } from '../assets/images'

const classes = [
  {
    icon: Crown,
    title: 'Indian Classical',
    hindi: '\u0936\u093e\u0938\u094d\u0924\u094d\u0930\u0940\u092f',
    level: 'Kathak \u00b7 Bharatanatyam',
    desc: 'Our signature pathway. Rooted in Kathak tradition \u2014 mudras, chakkars, footwork and expressive abhinaya, taught with reverence and rigour.',
    img: CLASS_IMAGES.classical,
    tint: 'from-gold/40 to-saffron/20',
    featured: true,
  },
  {
    icon: Sparkles,
    title: 'Contemporary Art',
    hindi: '\u0938\u092e\u0915\u093e\u0932\u0940\u0928',
    level: 'All levels',
    desc: 'Fluid movements combining elements of modern dance, ballet and expressionistic storytelling \u2014 inspired by Indian aesthetics.',
    img: CLASS_IMAGES.contemporary,
    tint: 'from-vermillion/40 to-maroon/20',
  },
  {
    icon: Flame,
    title: 'Urban & Hip-Hop',
    hindi: '\u0939\u093f\u092a-\u0939\u0949\u092a',
    level: 'All levels',
    desc: 'High-energy routines focusing on isolation, musicality and street styles, led by industry professionals.',
    img: CLASS_IMAGES.hiphop,
    tint: 'from-ember/40 to-vermillion/20',
  },
]

export default function Classes() {
  return (
    <section id="classes" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow">01 — Premium Curriculum</p>
            <h2 className="section-title mt-3">Three pathways to <span className="gradient-text italic">mastery</span>.</h2>
          </div>
          <p className="max-w-md text-ivory/60">
            Three distinct pathways to mastering the art of dance, each guided by experienced instructors and tailored to every level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {classes.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              data-hover
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SafeImg src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.tint} mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-ivory/90">
                  <c.icon size={14} className="text-gold" /> {c.level}
                </div>
                {c.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-saffron to-vermillion text-[10px] tracking-[0.25em] uppercase font-medium text-ivory shadow-lg">
                    Signature
                  </div>
                )}
                <div className="absolute bottom-4 right-4 devanagari text-2xl text-gold/90 leading-none">{c.hindi}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl md:text-3xl font-medium text-ivory">{c.title}</h3>
                <p className="text-ivory/60 text-sm mt-2 leading-relaxed">{c.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-ivory/50">All levels welcome</span>
                  <span className="text-sm text-gold font-medium group-hover:translate-x-1 transition-transform duration-500 inline-flex items-center gap-1">
                    Explore →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
