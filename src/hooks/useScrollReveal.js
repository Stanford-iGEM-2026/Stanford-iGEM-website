import { useEffect } from 'react'

function revealInView(items, observer) {
  items.forEach((item) => {
    const rect = item.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08
    if (inView) {
      item.classList.add('scroll-reveal--visible')
      observer.unobserve(item)
    }
  })
}

export function useScrollReveal(containerRef, deps = []) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll('.scroll-reveal')
    if (!items.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      items.forEach((item) => item.classList.add('scroll-reveal--visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-reveal--visible')
              observer.unobserve(entry.target)
            }
          })
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -2% 0px' }
    )

    items.forEach((item) => observer.observe(item))

    requestAnimationFrame(() => {
      revealInView(items, observer)
    })

    return () => observer.disconnect()
  }, deps)
}
