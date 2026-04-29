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
    const observers = []
    SECTIONS.forEach(({ id }) => {
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
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
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
