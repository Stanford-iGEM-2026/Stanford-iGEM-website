import { useRef, useState } from 'react'
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArchiveProjectCard, ProjectCard } from './ProjectCard'

export default function Projects() {
  const [expanded, setExpanded] = useState(false)
  const sectionRef = useRef(null)

  useScrollReveal(sectionRef, [expanded])

  return (
    <section className="projects" ref={sectionRef}>
      <div className="projects__grid scroll-reveal" style={{ '--reveal-delay': '0.12s' }}>
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} reveal={false} />
        ))}
      </div>

      <div className="projects__expand-wrap scroll-reveal" style={{ '--reveal-delay': '0.35s' }}>
        <button
          type="button"
          className="projects__expand"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show fewer projects' : 'View all past projects'}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="18"
            height="18"
            className={`projects__expand-icon ${expanded ? 'projects__expand-icon--open' : ''}`}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="project-archive">
          <div className="project-archive__grid">
            {ARCHIVE_PROJECTS.map((project, i) => (
              <ArchiveProjectCard
                key={`${project.year}-${project.title}`}
                project={project}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
