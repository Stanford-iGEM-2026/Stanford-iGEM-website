import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function BiohackersParallax() {
  const sectionRef = useRef(null)
  const [imageOffset, setImageOffset] = useState(0)

  useScrollReveal(sectionRef)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ticking = false

    const updateParallax = () => {
      ticking = false
      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight
      const travel = rect.height + viewport
      const progress = (viewport - rect.top) / travel
      const clamped = Math.min(Math.max(progress, 0), 1)
      const offset = (clamped - 0.5) * 140

      setImageOffset(offset)
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
    <section className="biohackers-parallax" id="projects" ref={sectionRef} aria-label="We are biohackers">
      <div className="biohackers-parallax__media" aria-hidden="true">
        <img
          src="/Images/stanfordCampus.jpeg"
          alt=""
          className="biohackers-parallax__image"
          style={{ transform: `translate3d(0, ${imageOffset}px, 0) scale(1.12)` }}
          loading="lazy"
        />
        <div className="biohackers-parallax__shade" />
      </div>

      <div className="biohackers-parallax__content scroll-reveal" style={{ '--reveal-delay': '0.12s' }}>
        <p className="biohackers-parallax__eyebrow">What we have built</p>
        <h2 className="biohackers-parallax__title">
          Our <em>Projects</em>
        </h2>
      </div>
    </section>
  )
}
