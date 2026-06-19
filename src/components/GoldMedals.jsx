import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const MEDALS = [
  { count: 10, label: 'Gold Medals', color: '#8e1918', symbol: 'Au' },
  { count: 4, label: 'Silver Medals', color: '#6b7280', symbol: 'Ag' },
  { count: 1, label: 'Bronze Medal', color: '#9a6b3c', symbol: 'bronze', symbolSize: 8 },
]

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

function MedalStat({ count, label, color, symbol, symbolSize = 15, index = 0 }) {
  const [value, ref] = useCountUp(count)

  return (
    <div
      className="gold-medals__item scroll-reveal"
      ref={ref}
      style={{ '--reveal-delay': `${index * 0.1}s` }}
    >
      <div className="gold-medals__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="26" r="14" stroke={color} strokeWidth="1.5" />
          <path d="M18 12 L24 6 L30 12" stroke="#1c7170" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 6 L24 12" stroke="#1c7170" strokeWidth="1.5" />
          <text x="24" y="30" textAnchor="middle" fill={color} fontSize={symbolSize} fontFamily="Montserrat, sans-serif" fontWeight="700">{symbol}</text>
        </svg>
      </div>
      <div className="gold-medals__text">
        <span className="gold-medals__count" style={{ color }}>{value}</span>
        <span className="gold-medals__label">{label}</span>
      </div>
    </div>
  )
}

export default function GoldMedals() {
  const sectionRef = useRef(null)

  useScrollReveal(sectionRef)

  return (
    <section className="gold-medals" ref={sectionRef} aria-label="iGEM Jamboree medals">
      <div className="gold-medals__inner">
        {MEDALS.map((medal, i) => (
          <MedalStat key={medal.label} {...medal} index={i} />
        ))}
      </div>
      <p className="gold-medals__subtitle scroll-reveal" style={{ '--reveal-delay': '0.3s' }}>
        at iGEM Jamboree
      </p>
    </section>
  )
}
