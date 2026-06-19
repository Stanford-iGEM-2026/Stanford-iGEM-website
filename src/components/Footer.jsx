import { Link, useLocation } from 'react-router-dom'
import { navigateToHash } from '../utils/scrollToSection'

const SITE_LOGO = '/Images/logo2.jpeg?v=3'

const FOOTER_LINKS = [
  { label: 'About', to: '/#about' },
  { label: 'Team', to: '/team' },
  { label: 'Initiatives', to: '/#programs' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Support', to: '/#support' },
  { label: 'News', to: '/news' },
]

export default function Footer() {
  const location = useLocation()

  const handleLinkClick = (to) => (e) => {
    if (navigateToHash(to, location.pathname)) {
      e.preventDefault()
      return
    }

    if (to === '/news' && location.pathname === '/news') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (to === '/team' && location.pathname === '/team') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer__art" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="footer__wave">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
        <div className="footer__dna-strip">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="footer__dna-node" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      <div className="footer__body">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={SITE_LOGO} alt="Stanford iGEM" className="footer__logo" />
            <div>
              <p className="footer__name">
                <span className="footer__name-line">Stanford</span>{' '}
                <span className="footer__name-line footer__name-line--accent">
                  i<span className="footer__name-gem">GEM</span>
                </span>
              </p>
              <p className="footer__tagline">Bioengineers brewing breakthroughs, one gene at a time! </p>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link" onClick={handleLinkClick(link.to)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer__contact">
            <p>Stanford University</p>
            <p>Stanford, CA 94305</p>
            <a href="mailto:stanfordigemteam@gmail.com">stanfordigemteam@gmail.com</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Stanford iGEM. All rights reserved.</p>
          <div className="footer__social">
            <a href="https://www.instagram.com/stanford_igem/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/stanford-igem/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
                <path d="M8 10.5v6.5M8 7.5v.01" strokeLinecap="round" />
                <path d="M12 17v-4.2c0-1.2 1-2.2 2.2-2.2s1.8.9 1.8 2.2V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              LinkedIn
            </a>
            <a href="mailto:stanfordigemteam@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 6h16v12H4z" />
                <path d="M4 7l8 6 8-6" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
