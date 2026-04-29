import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const quotes = [
  {
    text: 'My daughter has transformed completely since joining Fida Academy. The classical dance training is authentic and the teachers are incredibly patient and knowledgeable.',
    name: 'Parent',
    role: 'Indian Classical',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  },
  {
    text: 'The hip-hop classes are absolutely fire! The energy, the choreography, the vibe — everything is top-notch. Best studio in Ranchi, hands down.',
    name: 'Student',
    role: 'Urban & Hip-Hop',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  },
  {
    text: 'As someone who started dancing at 30, I was nervous. But Fida Academy welcomed me with open arms. The contemporary classes are therapeutic and beautiful.',
    name: 'Adult Learner',
    role: 'Contemporary Art',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    text: 'Namita ma\u2019am\u2019s vision for the academy is inspiring. The inclusive environment and professional approach make this the best dance school in Jharkhand.',
    name: 'Community Member',
    role: 'Ranchi',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  const q = quotes[i]
  const next = () => setI((i + 1) % quotes.length)
  const prev = () => setI((i - 1 + quotes.length) % quotes.length)

  return (
    <section className="relative py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <p className="eyebrow text-center">07 — Words from the floor</p>
        <h2 className="section-title text-center mt-3 text-ivory">
          Real <span className="gradient-text italic text-gold">stories</span>.
        </h2>

        <div className="relative mt-14 glass rounded-3xl p-8 md:p-14 overflow-hidden bg-ivory/5">
          <Quote className="absolute -top-4 -left-4 text-gold/10" size={180} />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <p className="font-display italic text-2xl md:text-3xl leading-relaxed text-ivory/90">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-8 flex items-center gap-4">
                <img src={q.img} alt={q.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-gold/30" />
                <div>
                  <p className="font-semibold text-ivory">{q.name}</p>
                  <p className="text-sm text-gold/80">{q.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex gap-2">
            <button onClick={prev} className="w-11 h-11 rounded-full glass hover:border-gold/50 hover:text-gold grid place-items-center transition-all duration-500" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={next} className="w-11 h-11 rounded-full glass hover:border-gold/50 hover:text-gold grid place-items-center transition-all duration-500" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
