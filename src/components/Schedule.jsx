import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const schedule = {
  Mon: [
    { time: '6:30 AM', title: 'Kathak — Foundations', who: 'Namita', room: 'Studio A' },
    { time: '5:30 PM', title: 'Hip-Hop Foundations', who: 'Urban Faculty', room: 'Studio B' },
    { time: '7:00 PM', title: 'Kathak — Level 2', who: 'Namita', room: 'Studio A' },
  ],
  Tue: [
    { time: '6:30 AM', title: 'Contemporary Flow', who: 'Contemporary Faculty', room: 'Studio A' },
    { time: '6:00 PM', title: 'Bharatanatyam', who: 'Classical Faculty', room: 'Studio B' },
    { time: '7:30 PM', title: 'Kathak — Abhinaya', who: 'Namita', room: 'Studio A' },
  ],
  Wed: [
    { time: '6:30 AM', title: 'Kathak — Tatkar', who: 'Namita', room: 'Studio A' },
    { time: '5:30 PM', title: 'Hip-Hop Advanced', who: 'Urban Faculty', room: 'Studio B' },
    { time: '7:00 PM', title: 'Contemporary', who: 'Contemporary Faculty', room: 'Studio A' },
  ],
  Thu: [
    { time: '6:30 AM', title: 'Kathak — Chakkars', who: 'Namita', room: 'Studio A' },
    { time: '6:00 PM', title: 'Bharatanatyam', who: 'Classical Faculty', room: 'Studio B' },
    { time: '7:30 PM', title: 'Hip-Hop Freestyle', who: 'Urban Faculty', room: 'Studio A' },
  ],
  Fri: [
    { time: '6:30 AM', title: 'Kathak — Open Class', who: 'Namita', room: 'Studio A' },
    { time: '6:00 PM', title: 'Contemporary Flow', who: 'Contemporary Faculty', room: 'Studio B' },
  ],
  Sat: [
    { time: '10:00 AM', title: 'Kids Kathak', who: 'Namita', room: 'Studio A' },
    { time: '12:00 PM', title: 'Open Floor', who: 'All', room: 'All studios' },
    { time: '4:00 PM', title: 'Performance Lab', who: 'Faculty', room: 'Studio A' },
  ],
}

export default function Schedule() {
  const [active, setActive] = useState('Mon')

  return (
    <section id="schedule" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow">04 — This week</p>
            <h2 className="section-title mt-3">Drop in. <span className="gradient-text italic">Any day.</span></h2>
          </div>
          <p className="max-w-md text-ivory/60">Drop in any day of the week. First class is on the house — bring a friend.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                active === d
                  ? 'bg-gradient-to-r from-saffron via-vermillion to-maroon text-ivory shadow-lg shadow-vermillion/20 border border-gold/30'
                  : 'glass text-ivory/70 hover:text-ivory hover:border-gold/30'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <AnimatePresence mode="wait">
            {schedule[active].map((s, i) => (
              <motion.div
                key={active + s.time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                data-hover
                className="group glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-white/30 transition-colors"
              >
                <div className="md:w-32">
                  <div className="flex items-center gap-2 text-gold">
                    <Clock size={14} /> <span className="font-mono text-ivory">{s.time}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-ivory">{s.title}</h3>
                  <p className="text-sm text-ivory/60">with {s.who}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-ivory/60">
                  <MapPin size={14} className="text-gold" /> {s.room}
                </div>
                <a href="#contact" className="btn-ghost !py-2 !px-4 text-sm">Reserve</a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
