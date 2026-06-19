import { useEffect } from 'react'
import Team from '../components/Team'
import PageHeroParallax from '../components/PageHeroParallax'

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <main className="team-page">
      <PageHeroParallax
        variant="team-page"
        title="Our Team"
        subtitle="The students, VSO leaders, and mentors who make Stanford iGEM possible."
      />

      <div className="team-page__body">
        <Team />
      </div>
    </main>
  )
}
