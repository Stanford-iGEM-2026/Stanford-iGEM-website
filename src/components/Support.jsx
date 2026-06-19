import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Support() {
  const sectionRef = useRef(null)

  useScrollReveal(sectionRef)

  return (
    <section className="support" id="support" ref={sectionRef}>
      <div className="support__inner">
        <div className="support__visual scroll-reveal">
          <img
            src="/Images/competition2025.jpeg"
            alt="Stanford iGEM team at the 2025 iGEM competition"
            className="support__photo"
            loading="lazy"
          />
        </div>

        <div className="support__content">
          <span className="section-label section-label--light scroll-reveal">Get Involved</span>
          <h2
            className="section-heading section-heading--light scroll-reveal"
            style={{ '--reveal-delay': '0.08s' }}
          >
            Support our mission
          </h2>
          <p className="support__text scroll-reveal" style={{ '--reveal-delay': '0.14s' }}>
          For over 15 years, Stanford iGEM teams have strived to bridge the gap between real-world problems and scientific innovation. But our work is only possible with the help of mentors and sponsors, who equip us with invaluable guidance and the financial support we need to bring our ideas to life. 

          </p>
          <p className="support__text scroll-reveal" style={{ '--reveal-delay': '0.18s' }}>
            If you are interested in either becoming a faculty mentor of the
            Stanford iGEM team or sponsoring our research, please contact us at{' '}
            <a href="mailto:stanfordigemteam@gmail.com" className="support__email">
              stanfordigemteam@gmail.com
            </a>
            . You can help make a difference to drive synthetic biology forward!
          </p>
          <div className="support__actions scroll-reveal" style={{ '--reveal-delay': '0.22s' }}>
            <a href="mailto:stanfordigemteam@gmail.com" className="btn btn--light">
              Become a Sponsor
            </a>
            <a href="mailto:stanfordigemteam@gmail.com" className="btn btn--ghost">
              Become a Mentor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
