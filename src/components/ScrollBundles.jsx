import React, { useRef, useEffect, useState } from 'react'

const TECH_ITEMS = [
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Java', 'C++', 'Three.js', 'WebSocket', 'Flask',
  'HTML5', 'CSS3', 'MongoDB', 'PostgreSQL', 'Figma',
]

const BENTO_IMAGES = [
  { src: '/artwork/artwork 1.jpg', alt: 'Artwork 1' },
  { src: '/artwork/artwork 2.jpg', alt: 'Artwork 2' },
  { src: '/artwork/artwork 3.jpg', alt: 'Artwork 3' },
  { src: '/artwork/artwork 4.jpg', alt: 'Artwork 4' },
  { src: '/artwork/artwork 5.jpg', alt: 'Artwork 5' },
  { src: '/artwork/artwork 6.jpg', alt: 'Artwork 6' },
  { src: '/artwork/artwork 1.jpg', alt: 'Artwork 1 Alt' },
  { src: '/artwork/artwork 2.jpg', alt: 'Artwork 2 Alt' },
]

export default function ScrollBundles() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let isVisible = false

    const updateStyles = () => {
      if (!sectionRef.current || !isVisible) {
        ticking = false
        return
      }

      const scrollY = window.scrollY
      const strip1Offset = scrollY * 0.15
      const strip2Offset = -(scrollY * 0.12)

      sectionRef.current.style.setProperty('--strip1-x', `${-strip1Offset}px`)
      sectionRef.current.style.setProperty('--strip2-x', `${-strip2Offset}px`)
      
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateStyles)
        ticking = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          window.addEventListener('scroll', onScroll, { passive: true })
          onScroll()
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      },
      { threshold: 0.01 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  // Build repeated items for continuous feel
  const techRow = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS]
  const imgRow1 = [...BENTO_IMAGES.slice(0, 4), ...BENTO_IMAGES.slice(0, 4), ...BENTO_IMAGES.slice(0, 4)]

  return (
    <section className="tilted-strips-section" ref={sectionRef}>
      {/* Strip 1: Tech text items — tilted, moves right on scroll */}
      <div className="tilted-strip strip-1" style={{ transform: 'rotate(-3deg) scale(1.08)' }}>
        <div
          className="tilted-strip-track"
          style={{ transform: 'translateX(var(--strip1-x, 0))' }}
        >
          {techRow.map((name, i) => (
            <span className="strip-text-item" key={`t1-${i}`}>{name}</span>
          ))}
        </div>
      </div>

      {/* Strip 2: Image items — tilted opposite, moves left on scroll */}
      <div className="tilted-strip strip-2" style={{ transform: 'rotate(2.5deg) scale(1.08)' }}>
        <div
          className="tilted-strip-track"
          style={{ transform: 'translateX(var(--strip2-x, 0))' }}
        >
          {imgRow1.map((item, i) => (
            <div className="strip-img-item" key={`s2-${i}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
