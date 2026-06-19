import { useRef, useState } from 'react'
import { TEAM_GROUPS, getInitials } from '../data/team'
import { useScrollReveal } from '../hooks/useScrollReveal'

function TeamMemberPhoto({ name, image }) {
  const [failed, setFailed] = useState(!image)

  if (failed) {
    return (
      <div className="team-card__photo team-card__photo--placeholder" aria-hidden="true">
        <span>{getInitials(name)}</span>
      </div>
    )
  }

  return (
    <img
      src={image}
      alt=""
      className="team-card__photo"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

function TeamCard({ member, showEmail = true, index = 0 }) {
  return (
    <article
      className="team-card scroll-reveal"
      style={{ '--reveal-delay': `${(index % 4) * 0.08}s` }}
    >
      <TeamMemberPhoto name={member.name} image={member.image} />
      <div className="team-card__body">
        <h3 className="team-card__name">{member.name}</h3>
        {member.role && <p className="team-card__role">{member.role}</p>}
        {showEmail && (
          <a href={`mailto:${member.email}`} className="team-card__email">
            {member.email}
          </a>
        )}
      </div>
    </article>
  )
}

export default function Team() {
  const contentRef = useRef(null)

  useScrollReveal(contentRef)

  return (
    <div className="team__content" ref={contentRef}>
      {TEAM_GROUPS.map((group) => (
        <div key={group.id} className="team__group">
          <h2
            className="team__group-title scroll-reveal"
            style={{ '--reveal-delay': '0.05s' }}
          >
            {group.title}
          </h2>
          <div className="team__grid">
            {group.members.map((member, i) => (
              <TeamCard
                key={`${group.id}-${member.email}`}
                member={member}
                showEmail={group.id !== 'faculty'}
                index={i}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
