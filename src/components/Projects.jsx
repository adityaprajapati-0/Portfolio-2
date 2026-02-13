import React, { useRef, useEffect, useState } from 'react'
import HollowText from './HollowText'

const PROJECTS = [
  {
    number: '01',
    name: 'NeoLearn',
    subtitle: 'Interactive Learning Platform',
    tech: ['React', 'Three.js', 'Node.js'],
    image: '/projects/Neolearn.png',
    link: 'https://adixdd-neurolearn.netlify.app/',
  },
  {
    number: '02',
    name: 'SignSense AI',
    subtitle: 'Computer Vision Application',
    tech: ['Python', 'Flask', 'Mediapipe'],
    image: '/projects/SignSense Ai.png',
    link: 'https://adixdd-signsense-ai.netlify.app/',
  },
  {
    number: '03',
    name: 'Snake Game',
    subtitle: 'Classic Arcade Reimagined',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/Snake Game.png',
    link: 'https://adixdd-snakegame.netlify.app/',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [cardStyles, setCardStyles] = useState(PROJECTS.map(() => ({ scale: 1, opacity: 1 })))

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const wrappers = sectionRef.current.querySelectorAll('.stack-card-wrapper')
      const newStyles = []

      wrappers.forEach((wrapper, i) => {
        const rect = wrapper.getBoundingClientRect()
        if (i < PROJECTS.length - 1) {
          const nextWrapper = wrappers[i + 1]
          if (nextWrapper) {
            const nextRect = nextWrapper.getBoundingClientRect()
            // How much the next card has overlapped this one
            const stickyTop = 80 + i * 5
            const nextStickyTop = 80 + (i + 1) * 5
            const overlap = Math.max(0, Math.min(1, (stickyTop + 50 - nextRect.top) / 300))
            newStyles.push({
              scale: 1 - overlap * 0.06,
              opacity: 1 - overlap * 0.5,
            })
          } else {
            newStyles.push({ scale: 1, opacity: 1 })
          }
        } else {
          newStyles.push({ scale: 1, opacity: 1 })
        }
      })

      setCardStyles(newStyles)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="projects section-wrapper" id="projects" ref={sectionRef}>
      <HollowText>Projects</HollowText>

      <div className="stack-container">
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            className="stack-card-wrapper"
            style={{
              '--card-z': i + 1,
              top: `${80 + i * 5}px`,
              zIndex: i + 1,
              marginBottom: i < PROJECTS.length - 1 ? '15vh' : '5vh',
            }}
          >
            <div
              className="stack-card"
              style={{
                transform: `scale(${cardStyles[i]?.scale ?? 1})`,
                opacity: cardStyles[i]?.opacity ?? 1,
                transformOrigin: 'center top',
              }}
            >
              {/* Card Header */}
              <div className="stack-card-header">
                <div className="stack-card-meta">
                  <span className="stack-card-number">{project.number}</span>
                  <div className="stack-card-label">
                    <span className="stack-card-name">{project.name}</span>
                    <span className="stack-card-sub">{project.subtitle}</span>
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stack-live-btn"
                >
                  <span className="stack-live-dot" />
                  Live Project
                </a>
              </div>

              {/* Single Image */}
              <div className="stack-bento">
                <div className="stack-bento-item">
                  <img src={project.image} alt={`${project.name}`} loading="lazy" />
                </div>
              </div>

              {/* Tech Tags */}
              <div className="stack-tech">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
