export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return false

  const navHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
  ) || 96
  const offset = 16
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight - offset
  const nextTop = Math.max(0, top)

  const scrollingElement = document.scrollingElement ?? document.documentElement
  scrollingElement.scrollTop = nextTop
  window.scrollTo({ top: nextTop, behavior: 'auto' })

  return true
}

export function scrollToHash(id) {
  if (id === 'footer') {
    return scrollToPageBottom()
  }

  return scrollToSection(id)
}

export function navigateToHash(to, pathname) {
  const hashIndex = to.indexOf('#')
  if (hashIndex === -1) return false

  const path = to.slice(0, hashIndex) || '/'
  const id = to.slice(hashIndex + 1)
  if (!id || pathname !== path) return false

  window.history.pushState(null, '', `${path}#${id}`)
  return scrollToHash(id)
}

export function scrollToPageBottom() {
  const scrollingElement = document.scrollingElement ?? document.documentElement
  const nextTop = Math.max(0, scrollingElement.scrollHeight - window.innerHeight)

  scrollingElement.scrollTop = nextTop
  window.scrollTo({ top: nextTop, behavior: 'auto' })

  return true
}
