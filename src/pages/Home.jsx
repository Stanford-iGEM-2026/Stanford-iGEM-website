import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ParallaxPikachu from '../components/ParallaxPikachu'
import Hero from '../components/Hero'
import GoldMedals from '../components/GoldMedals'
import About from '../components/About'
import Programs from '../components/Programs'
import BiohackersParallax from '../components/BiohackersParallax'
import Projects from '../components/Projects'
import Support from '../components/Support'
import { scrollToHash } from '../utils/scrollToSection'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    let cancelled = false

    const runScroll = () => {
      if (!cancelled) scrollToHash(id)
    }

    requestAnimationFrame(() => {
      runScroll()
      requestAnimationFrame(runScroll)
    })

    return () => {
      cancelled = true
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <ParallaxPikachu />
      <main>
        <Hero />
        <GoldMedals />
        <About />
        <Programs />
        <BiohackersParallax />
        <Projects />
        <Support />
      </main>
    </>
  )
}
