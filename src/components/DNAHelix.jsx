export default function DNAHelix({ className = '' }) {
  return (
    <svg
      className={`dna-helix ${className}`}
      viewBox="0 0 120 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="dna-strand dna-strand--a"
        d="M60 0 C90 40, 30 80, 60 120 C90 160, 30 200, 60 240 C90 280, 30 320, 60 360 C75 380, 60 400, 60 400"
        stroke="#8e1918"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        className="dna-strand dna-strand--b"
        d="M60 0 C30 40, 90 80, 60 120 C30 160, 90 200, 60 240 C30 280, 90 320, 60 360 C45 380, 60 400, 60 400"
        stroke="#1c7170"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {Array.from({ length: 16 }).map((_, i) => {
        const y = 20 + i * 24
        const offset = i % 2 === 0 ? -22 : 22
        return (
          <line
            key={i}
            className="dna-rung"
            x1={60 + offset}
            y1={y}
            x2={60 - offset}
            y2={y}
            stroke="rgba(10,10,10,0.15)"
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        )
      })}
    </svg>
  )
}
