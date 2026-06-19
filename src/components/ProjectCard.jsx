function ProjectLogo({ logo, alt }) {
  if (!logo) return null

  return (
    <div className="project-card__logo-wrap">
      <img src={logo} alt={alt} className="project-card__logo" loading="lazy" />
    </div>
  )
}

export function ProjectCard({ project, index, reveal = true }) {
  return (
    <article
      className={`project-card ${reveal ? 'scroll-reveal' : ''} ${project.isPlaceholder ? 'project-card--placeholder' : ''}`}
      style={{ '--card-accent': project.color, '--reveal-delay': `${index * 0.1}s` }}
    >
      <div className="project-card__top">
        <span className="project-card__year">{project.year}</span>
        <span className="project-card__tag">{project.tag}</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <ProjectLogo logo={project.logo} alt={project.logoAlt ?? `${project.title} logo`} />
      <p className="project-card__desc">{project.description}</p>
      {project.url ? (
        <a
          href={project.url}
          className="project-card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      ) : (
        <span className="project-card__soon">Details coming soon</span>
      )}
      <div className="project-card__accent" aria-hidden="true" />
    </article>
  )
}

export function ArchiveProjectCard({ project, index = 0 }) {
  return (
    <article
      className="project-archive__item scroll-reveal"
      style={{ '--reveal-delay': `${(index % 3) * 0.08}s` }}
    >
      <div className="project-archive__head">
        <span className="project-archive__year">{project.year}</span>
        <h3 className="project-archive__title">{project.title}</h3>
        <p className="project-archive__subtitle">{project.subtitle}</p>
      </div>
      <ProjectLogo logo={project.logo} alt={project.logoAlt ?? `${project.title} logo`} />
      <p className="project-archive__desc">{project.description}</p>
      <a
        href={project.url}
        className="project-card__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View wiki
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </article>
  )
}
