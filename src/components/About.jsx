import { useRef } from 'react'
import IgemTimeline from './IgemTimeline'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const sectionRef = useRef(null)

  useScrollReveal(sectionRef)

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__grid">
        <div className="about__visual scroll-reveal">
          <IgemTimeline />
        </div>

        <div className="about__content">
          <span className="section-label scroll-reveal" style={{ '--reveal-delay': '0.06s' }}>
            Who We Are
          </span>
          <h2 className="section-heading scroll-reveal" style={{ '--reveal-delay': '0.1s' }}>
            What is{' '}
            <span className="section-heading__accent">
              STANFORD i<span className="section-heading__gem">GEM</span>
            </span>
            ?
          </h2>
          <p className="about__text scroll-reveal" style={{ '--reveal-delay': '0.14s' }}>
          Stanford University bioengineer Drew Endy first co-founded iGEM (International Genetically Engineered Machine) in 2003 at MIT. Stanford’s multidisciplinary iGEM team was established in 2009 with his support and now operates under Stanford’s Bioengineering Department. Alongside hundreds of other teams around the world, we aim to advance the growing field of synthetic biology through education, research, and collaboration. 
          </p>
          <div className="about__stats scroll-reveal" style={{ '--reveal-delay': '0.22s' }}>
            <div className="about__stat">
              <span className="about__stat-num">15+</span>
              <span className="about__stat-label">Years of Competition</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">~200</span>
              <span className="about__stat-label">Team members over the years</span>
            </div>
          </div>

          <figure className="about__team-photo scroll-reveal" style={{ '--reveal-delay': '0.28s' }}>
            <img
              src="/Images/2026team.jpeg"
              alt="Stanford iGEM 2026 team"
              className="about__team-photo-img"
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      <div className="about__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="about__wave-svg">
          <path
            d="M0,68 C50,18 110,10 175,38 C240,66 310,108 395,102 C480,96 545,42 630,32 C715,22 795,58 875,92 C955,126 1035,118 1115,72 C1195,26 1275,34 1345,52 C1395,64 1420,58 1440,55 L1440,160 L0,160 Z"
            fill="var(--teal)"
          />
        </svg>
      </div>
    </section>
  )
}
