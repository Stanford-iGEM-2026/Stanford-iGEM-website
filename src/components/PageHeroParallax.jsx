import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function PageHeroParallax({ variant, title, subtitle }) {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const bg = bgRef.current
    const inner = innerRef.current
    if (!hero || !bg || !inner) return

    let ticking = false

    const updateParallax = () => {
      ticking = false
      const rect = hero.getBoundingClientRect()
      const scrolledPast = Math.max(0, -rect.top)
      const bgY = scrolledPast * 0.42
      const contentY = scrolledPast * 0.18
      const fade = Math.max(0, 1 - scrolledPast / (rect.height * 0.9))
      const scale = 1.1 + scrolledPast * 0.00035

      bg.style.transform = `translate3d(0, ${bgY}px, 0) scale(${scale})`
      inner.style.transform = `translate3d(0, ${contentY}px, 0)`
      inner.style.opacity = String(fade)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateParallax)
      }
    }

    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={`${variant}__hero`} ref={heroRef}>
      <div
        ref={bgRef}
        className={`${variant}__hero-bg`}
        aria-hidden="true"
      />
      <div className={`${variant}__hero-inner`} ref={innerRef}>
        <Link to="/" className={`${variant}__back`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>
        <h1 className={`${variant}__title`}>{title}</h1>
        <p className={`${variant}__subtitle`}>{subtitle}</p>
      </div>
    </div>
  )
}
