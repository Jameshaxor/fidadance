import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'top', label: 'Intro' },
  { id: 'classes', label: 'Classes' },
  { id: 'rhythm', label: 'Rhythm' },
  { id: 'founder', label: 'Founder' },
  { id: 'instructors', label: 'Faculty' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Visit' },
]

export default function ScrollRail() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    // Sections below the fold are lazy-loaded (see App.jsx), so they don't
    // exist in the DOM when this effect first runs. We attach observers
    // idempotently as each section appears.
    const observers = new Map()

    const attach = (id) => {
      if (observers.has(id)) return
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id)
          })
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.set(id, obs)
    }

    const attachAll = () => SECTIONS.forEach(({ id }) => attach(id))

    // First pass: pick up sections already in the DOM (Hero, Marquee).
    attachAll()

    // Watch <main> for late-mounting lazy sections and attach observers
    // for them as they hydrate. Once all sections are attached the
    // MutationObserver still fires on Framer Motion DOM churn, but each
    // call is a cheap Map lookup that early-exits.
    const main = document.querySelector('main')
    let mo
    if (main) {
      mo = new MutationObserver(attachAll)
      mo.observe(main, { childList: true, subtree: true })
    }

    return () => {
      if (mo) mo.disconnect()
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return (
    <aside
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
    >
      {SECTIONS.map(({ id, label }) => {
        const on = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group relative flex items-center justify-end gap-3"
          >
            <span
              className={[
                'text-[10px] tracking-[0.3em] uppercase transition-all duration-500',
                on
                  ? 'text-gold translate-x-0 opacity-100'
                  : 'text-ivory/40 translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0',
              ].join(' ')}
            >
              {label}
            </span>
            <span
              className={[
                'block rounded-full transition-all duration-500',
                on
                  ? 'w-2.5 h-2.5 bg-gold shadow-[0_0_10px_rgba(245,158,43,0.8)]'
                  : 'w-1.5 h-1.5 bg-ivory/30 group-hover:bg-gold/60',
              ].join(' ')}
            />
          </a>
        )
      })}
    </aside>
  )
}
