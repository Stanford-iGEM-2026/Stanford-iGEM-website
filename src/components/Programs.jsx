import { useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import HelixIndicator from './HelixIndicator'

const SIBRP_INSTAGRAM_URL = 'https://www.instagram.com/stanford_igem/'
const PHILS_LABERIA_URL = 'https://knockdev.itch.io/phils-laberia'

function Mitochondrion({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 72 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 17C10 8.5 20 3 36 6.5C52 3 62 8.5 62 17C62 25.5 52 31 36 27.5C20 31 10 25.5 10 17Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M18 17C22 12 26 22 32 17C38 12 42 22 46 17C50 12 54 20 54 17"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M24 17C27 14 30 20 33 17C36 14 39 20 42 17"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
    </svg>
  )
}

const PROGRAMS = [
  {
    id: 'sibrp',
    name: 'SiBRP',
    fullName: 'SiBRP',
    paragraphs: [
      'SiBRP (Stanford iGEM Bioengineering Research Program) is a free, online summer program designed for high school students and incoming first-year college students to gain greater exposure to synthetic biology through speaker sessions, workshops, and direct mentorship. Applications typically open in June, with the program running for three weeks in July.',
    ],
    linkText: 'Follow us on Instagram (@stanford_igem) for updates!',
    linkHref: SIBRP_INSTAGRAM_URL,
  },
  {
    id: 'phils-laberia',
    name: "Phil's Laberia",
    fullName: "Phil's Laberia",
    paragraphs: [
      'Created by members of the Stanford 2023 iGEM team, Phil’s Laberia is an interactive video game that teaches lab techniques from Stanford’s BIOE 44: Fundamentals of Engineering Biology Lab in an accessible, fun way',
    ],
    linkText: 'Check it out here!',
    linkHref: PHILS_LABERIA_URL,
  },
]

export default function Programs() {
  const [active, setActive] = useState('sibrp')
  const sectionRef = useRef(null)
  const current = PROGRAMS.find((p) => p.id === active)

  useScrollReveal(sectionRef)

  return (
    <section className="programs" id="programs" ref={sectionRef}>
      <div className="programs__mitochondria" aria-hidden="true">
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--1" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--2" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--3" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--4" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--5" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--6" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--7" />
        <Mitochondrion className="programs__mitochondrion programs__mitochondrion--8" />
      </div>

      <div className="programs__inner">
        <span className="section-label section-label--light">Initiatives</span>
        <h2 className="section-heading section-heading--light">
          Building the next generation
        </h2>

        <div
          className="programs__tabs"
          role="tablist"
          aria-label="Initiatives"
        >
          {PROGRAMS.map((program) => (
            <button
              key={program.id}
              role="tab"
              aria-selected={active === program.id}
              className={`programs__tab ${active === program.id ? 'programs__tab--active' : ''}`}
              onClick={() => setActive(program.id)}
            >
              {program.name}
              <HelixIndicator className="helix-indicator--programs" />
            </button>
          ))}
        </div>

        <div className="programs__panel" role="tabpanel">
          <div className="programs__panel-inner" key={active}>
            <h3 className="programs__panel-title">{current.fullName}</h3>
            {current.paragraphs.map((paragraph, index) => (
              <p key={index} className="programs__panel-text">
                {paragraph}
              </p>
            ))}
            {current.linkHref && (
              <a
                href={current.linkHref}
                className="programs__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {current.linkText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
