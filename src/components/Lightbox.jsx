import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ shots, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-night/90 backdrop-blur-xl grid place-items-center p-4 md:p-10"
          onClick={onClose}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full glass grid place-items-center hover:border-gold/50 hover:text-gold transition-colors"
          >
            <X size={18} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass grid place-items-center hover:border-gold/50 hover:text-gold transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass grid place-items-center hover:border-gold/50 hover:text-gold transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <motion.img
            key={shots[index].src}
            src={shots[index].src}
            alt=""
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[86vh] object-contain rounded-2xl border border-gold/20 shadow-[0_30px_90px_-20px_rgba(245,158,43,0.35)]"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-ivory/60">
            {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
