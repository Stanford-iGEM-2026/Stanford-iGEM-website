import { useEffect, useState } from 'react'

const SLIDES = [
  {
    src: '/Images/team2024.jpg',
    alt: 'Stanford iGEM team 2024',
    label: 'Team 2024',
  },
  {
    src: '/Images/igem.jpeg',
    alt: 'Stanford iGEM at iGEM competition',
    label: 'iGEM',
  },
  {
    src: '/Images/IMG_7544.jpg',
    alt: 'Stanford iGEM team presentation',
    label: 'Research',
  },
  {
    src: '/Images/heart2025.JPG',
    alt: 'Stanford iGEM team 2025 at the Wilfred Uytengsu Sr. Teaching Center',
    label: 'Team 2025',
  },
  {
    src: '/Images/mentor_photo.jpg',
    alt: 'Stanford iGEM mentors',
    label: 'Our Mentors',
  },
]

const INTERVAL_MS = 6500

export default function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, INTERVAL_MS)

    return () => clearTimeout(timer)
  }, [active])

  return (
    <div className="hero-slider" aria-hidden="true">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={`hero-slide ${index === active ? 'hero-slide--active' : ''}`}
        >
          <img
            src={slide.src}
            alt=""
            className="hero-slide__image"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="hero__mask" />
      <div className="hero__vignette" />
    </div>
  )
}
