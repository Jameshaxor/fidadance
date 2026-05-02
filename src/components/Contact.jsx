import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', style: 'Kathak', message: '' })

  // WhatsApp number in international format, no '+' or spaces (India: 91 + 9234430999)
  const WHATSAPP_NUMBER = '919234430999'

  const onSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `Hi Fida Dance Academy! I'd like to book a free trial.`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Preferred style: ${form.style}`,
    ]
    if (form.message.trim()) {
      lines.push(``, `Message: ${form.message.trim()}`)
    }
    const text = encodeURIComponent(lines.join('\n'))
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`

    // Programmatic anchor click is treated as a user gesture by every modern
    // browser, so it bypasses popup blockers that would silently kill
    // window.open() — especially on iOS Safari and Chrome desktop.
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', style: 'Kathak', message: '' })
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow">08 — Visit us</p>
          <h2 className="section-title mt-3">Ready when <span className="gradient-text italic">you</span> are.</h2>
          <p className="mt-5 text-ivory/70 max-w-md">Drop us a line or walk in. First class is on the house — come meet Namita and the studio.</p>

          <div className="mt-10 space-y-5">
            <Info icon={MapPin} label="Studio" value={<>Near Gandhi Nagar Gate, opp. PNB,<br/>Kanke Road, Vidyapati Nagar, Ranchi — 834008</>} />
            <Info icon={Phone} label="Phone" value={<a href="tel:09234430999" className="hover:text-gold transition-colors">092344 30999</a>} />
            <Info icon={Mail} label="Email" value={<a href="mailto:info@fidadance.com" className="hover:text-gold transition-colors">info@fidadance.com</a>} />
          </div>

          <div className="mt-8 glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron via-vermillion to-maroon grid place-items-center border border-gold/30"><span className="devanagari text-ivory">फ</span></div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Open daily</p>
              <p className="font-medium text-ivory">11:00 AM – 7:00 PM</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
            <iframe
              title="Fida Dance Academy on Google Maps"
              src="https://www.google.com/maps?q=Fida+Dance+Academy,+Kanke+Road,+Ranchi&hl=en&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.4) invert(0.9) hue-rotate(180deg)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href="https://www.google.com/maps/place/Fida+Dance+Academy/@23.4044054,85.3154121,17z/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm gradient-text font-medium"
          >
            Open in Google Maps →
          </a>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-8 space-y-5"
        >
          <Field label="Your name">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Jane Doe" />
          </Field>
          <Field label="Email">
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="jane@email.com" />
          </Field>
          <Field label="Preferred style">
            <select value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} className="input">
              {['Kathak', 'Bharatanatyam', 'Contemporary', 'Hip-Hop', 'Kids Kathak', 'Not sure yet'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Message">
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" placeholder="Tell us about your goals..." />
          </Field>

          <button type="submit" className="btn-primary w-full justify-center">
            {sent ? <><CheckCircle2 size={18} /> Opening WhatsApp&hellip;</> : <>Book my free trial <Send size={16} /></>}
          </button>
        </motion.form>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 16px;
          color: #fff;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: rgba(245,158,43,0.7);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 4px rgba(245,158,43,0.12);
        }
        .input::placeholder { color: rgba(244,234,210,0.35); }
        select.input option { background: #0a0610; color: #f4ead2; }
      `}</style>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl glass grid place-items-center shrink-0 text-gold">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">{label}</p>
        <p className="mt-1 text-ivory/90">{value}</p>
      </div>
    </div>
  )
}
