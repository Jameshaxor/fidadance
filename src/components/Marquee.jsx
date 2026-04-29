const words = [
  { en: 'Kathak', hi: 'कथक' },
  { en: 'Bharatanatyam', hi: 'भरतनाट्यम्' },
  { en: 'Contemporary', hi: 'समकालीन' },
  { en: 'Hip-Hop', hi: 'हिप-हॉप' },
  { en: 'Taal', hi: 'ताल' },
  { en: 'Bhav', hi: 'भाव' },
  { en: 'Nritya', hi: 'नृत्य' },
  { en: 'Laya', hi: 'लय' },
]

export default function Marquee() {
  return (
    <section aria-hidden className="relative py-6 md:py-10 border-y border-gold/10 bg-white/[0.015] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="mx-6 md:mx-10 flex items-baseline gap-3 font-display italic text-3xl md:text-5xl text-ivory/15 hover:text-gold transition-colors duration-500"
          >
            {w.en}
            <span className="devanagari not-italic text-xl md:text-3xl text-ivory/10 hover:text-gold/80 transition-colors">
              {w.hi}
            </span>
            <span className="text-gold/60">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
