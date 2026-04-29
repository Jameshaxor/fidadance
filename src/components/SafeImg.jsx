import { useState } from 'react'

// Image with graceful gradient fallback if the source fails to load.
export default function SafeImg({ src, alt = '', className = '', fallbackClass = 'bg-gradient-to-br from-maroon via-vermillion to-saffron', ...rest }) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} ${fallbackClass} relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)'
        }} />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
      {...rest}
    />
  )
}
