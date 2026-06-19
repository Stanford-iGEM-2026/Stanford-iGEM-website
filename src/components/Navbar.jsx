import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HelixIndicator from './HelixIndicator'
import { navigateToHash } from '../utils/scrollToSection'

const SITE_LOGO = '/Images/logo2.jpeg?v=3'

const CONTACT_EMAIL = 'stanfordigemteam@gmail.com'

const SECTION_LINKS = [
  { label: 'About', to: '/#about' },
  { label: 'Initiatives', to: '/#programs' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Support', to: '/#support' },
]

const PAGE_LINKS = [
  { label: 'Team', to: '/team' },
  { label: 'News', to: '/news' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isNewsPage = location.pathname === '/news'
  const isTeamPage = location.pathname === '/team'
  const isStandalonePage = isNewsPage || isTeamPage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const close = () => setOpen(false)

  const handleHomeClick = (e) => {
    close()

    if (location.pathname !== '/') return

    e.preventDefault()

    if (location.hash) {
      window.history.replaceState(null, '', '/')
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsClick = (e) => {
    close()

    if (location.pathname !== '/news') return

    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTeamClick = (e) => {
    close()

    if (location.pathname !== '/team') return

    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageClick = (to) => (e) => {
    if (to === '/news') handleNewsClick(e)
    if (to === '/team') handleTeamClick(e)
  }

  const handleSectionClick = (to) => (e) => {
    close()
    if (navigateToHash(to, location.pathname)) {
      e.preventDefault()
    }
  }

  return (
    <header className={`navbar ${scrolled || isStandalonePage ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__start">
          <Link to="/" className="navbar__stanford" onClick={handleHomeClick} aria-label="Stanford University — back to home">
            <img
              src="/Images/stanfordLogo.png"
              alt=""
              className="navbar__stanford-logo"
            />
            <span className="navbar__stanford-name">Stanford University</span>
          </Link>
          <span className="navbar__divider" aria-hidden="true" />
          <Link to="/" className="navbar__brand" onClick={handleHomeClick}>
            <img src={SITE_LOGO} alt="Stanford iGEM" className="navbar__logo" />
            <span className="navbar__title">
              <span className="navbar__title-line">Stanford</span>{' '}
              <span className="navbar__title-line navbar__title-line--accent">
                i<span className="navbar__title-gem">GEM</span>
              </span>
            </span>
          </Link>
        </div>

        <div className="navbar__end">
          <nav className="navbar__desktop" aria-label="Main navigation">
            {SECTION_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="navbar__link"
                onClick={handleSectionClick(link.to)}
              >
                {link.label}
                <HelixIndicator className="helix-indicator--navbar" />
              </Link>
            ))}
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                onClick={handlePageClick(link.to)}
              >
                {link.label}
                <HelixIndicator className="helix-indicator--navbar" />
              </Link>
            ))}
          </nav>

          <a href={`mailto:${CONTACT_EMAIL}`} className="navbar__contact">
            Contact Us
          </a>
        </div>

        <button
          className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__overlay ${open ? 'navbar__overlay--open' : ''}`} onClick={close} aria-hidden="true" />

      <nav
        className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="navbar__mobile-content">
          {SECTION_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__mobile-link"
              style={{ transitionDelay: open ? `${0.05 + i * 0.06}s` : '0s' }}
              onClick={handleSectionClick(link.to)}
            >
              <span className="navbar__mobile-index">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
          {PAGE_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
              style={{ transitionDelay: open ? `${0.05 + (SECTION_LINKS.length + i) * 0.06}s` : '0s' }}
              onClick={handlePageClick(link.to)}
            >
              <span className="navbar__mobile-index">0{SECTION_LINKS.length + i + 1}</span>
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="navbar__mobile-link navbar__mobile-link--contact"
            style={{ transitionDelay: open ? `${0.05 + (SECTION_LINKS.length + PAGE_LINKS.length) * 0.06}s` : '0s' }}
            onClick={close}
          >
            <span className="navbar__mobile-index">0{SECTION_LINKS.length + PAGE_LINKS.length + 1}</span>
            Contact Us
          </a>
        </div>
      </nav>
    </header>
  )
}
