import { useEffect, useRef } from 'react'
import HeroSlider from './HeroSlider'

export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
      content.style.transform = `translateY(${progress * 60}px)`
      content.style.opacity = String(1 - progress * 0.6)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" ref={sectionRef} id="home">
      <HeroSlider />
      <div className="hero__content" ref={contentRef}>
        <div className="hero__badge">Since 2009</div>
        <h1 className="hero__heading">
          <span className="hero__heading-line">Stanford</span>
          <span className="hero__heading-line hero__heading-line--accent">
            i<span className="hero__heading-gem">GEM</span>
          </span>
        </h1>
        <p className="hero__sub">
        Pioneering synthetic biology solutions for
          <br />
          real-world problems
                  </p>

        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">
            Explore Our Work
          </a>
          <a href="#support" className="btn btn--hero-outline">
            Support the Mission
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
