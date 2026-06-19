import { useEffect, useRef, useState } from 'react'
import { NEWS_ITEMS, formatNewsDate } from '../data/news'
import PageHeroParallax from '../components/PageHeroParallax'
import { useScrollReveal } from '../hooks/useScrollReveal'

function NewsCardImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="news-card__image news-card__image--placeholder" aria-hidden="true">
        <span>Stanford iGEM</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="news-card__image"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export default function News() {
  const contentRef = useRef(null)

  useScrollReveal(contentRef)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <main className="news-page">
      <PageHeroParallax
        variant="news-page"
        title="News"
        subtitle="Highlights from competitions, outreach, and research across Stanford iGEM teams."
      />

      <div className="news-page__content" ref={contentRef}>
        <div className="news-page__grid">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.date + item.title}
              className="news-card scroll-reveal scroll-reveal--fade"
            >
              <NewsCardImage src={item.image} alt={item.imageAlt} />
              <div className="news-card__body">
                <time className="news-card__date" dateTime={item.date}>
                  {formatNewsDate(item.date)}
                </time>
                <h2 className="news-card__title">{item.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
