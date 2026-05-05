import { Instagram, Youtube, Twitter, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-10 mt-10 overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-gradient-to-t from-rose/10 to-transparent blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron via-vermillion to-maroon grid place-items-center border border-gold/40">
                <span className="devanagari text-ivory text-base leading-none">फ</span>
              </div>
              <span className="font-display text-xl font-bold">Fida<span className="gradient-text">.</span></span>
            </div>
            <p className="mt-4 text-ivory/60 max-w-sm">Fida Dance Academy — rooted in Kathak, flowing into every form. Ranchi’s premier dance studio, where movement becomes art.</p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Youtube,   href: 'https://www.youtube.com/@fidadanceacademy2696', label: 'YouTube' },
                { Icon: Twitter,   href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => {
                const external = href.startsWith('http')
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="w-10 h-10 rounded-full glass grid place-items-center hover:bg-white/10 hover:text-gold transition"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li><a href="#classes" className="hover:text-gold transition-colors">Classes</a></li>
              <li><a href="#instructors" className="hover:text-gold transition-colors">Instructors</a></li>
              <li><a href="#schedule" className="hover:text-gold transition-colors">Schedule</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Newsletter</p>
            <p className="mt-4 text-sm text-ivory/60">Studio events, class drops and inspiration — once a month.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input type="email" placeholder="you@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-white/30" />
              <button className="btn-primary !py-2 !px-4 text-sm">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Fida Dance Academy. All rights reserved.</p>
          <p>
            Designed by{' '}
            <a
              href="https://instagram.com/manu_haxor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/80 hover:text-gold transition-colors font-medium tracking-wide"
            >
              Manu Kumar Nayak
            </a>
            <span className="mx-2 text-ivory/20">·</span>
            Crafted with <span className="text-saffron">♥</span> in Ranchi
          </p>
        </div>
      </div>
    </footer>
  )
}
