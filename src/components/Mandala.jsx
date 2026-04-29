// Decorative layered mandala (pure SVG) for the Kathak hero.
export default function Mandala({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <g strokeWidth="0.6" opacity="0.9">
        {/* outer petals */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 24) * i} 200 200)`}>
              <path d="M200 30 C 210 60, 210 80, 200 110 C 190 80, 190 60, 200 30 Z" />
            </g>
          ))}
        </g>
        {/* inner lotus */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 12) * i} 200 200)`}>
              <path d="M200 110 C 215 140, 215 160, 200 180 C 185 160, 185 140, 200 110 Z" />
            </g>
          ))}
        </g>
        {/* concentric circles */}
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="160" strokeDasharray="2 3" />
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="110" strokeDasharray="1 4" />
        <circle cx="200" cy="200" r="82" />
        <circle cx="200" cy="200" r="60" strokeDasharray="3 2" />
        <circle cx="200" cy="200" r="36" />
        {/* innermost star */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 8) * i} 200 200)`}>
              <path d="M200 170 L 205 200 L 200 230 L 195 200 Z" fill="currentColor" opacity="0.3" />
            </g>
          ))}
        </g>
        {/* outer dots */}
        <g>
          {Array.from({ length: 48 }).map((_, i) => {
            const a = ((Math.PI * 2) / 48) * i
            const cx = 200 + Math.cos(a) * 178
            const cy = 200 + Math.sin(a) * 178
            return <circle key={i} cx={cx} cy={cy} r="1.2" fill="currentColor" />
          })}
        </g>
      </g>
    </svg>
  )
}
