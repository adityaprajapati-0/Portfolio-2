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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-driven translation — move slowly based on scroll position
  const strip1Offset = scrollY * 0.15
  const strip2Offset = -(scrollY * 0.12)

  // Build repeated items for continuous feel
  const techRow = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS]
  const imgRow1 = [...BENTO_IMAGES.slice(0, 4), ...BENTO_IMAGES.slice(0, 4), ...BENTO_IMAGES.slice(0, 4)]
  const imgRow2 = [...BENTO_IMAGES.slice(4), ...BENTO_IMAGES.slice(4), ...BENTO_IMAGES.slice(4)]

  return (
    <section className="tilted-strips-section">
      {/* Strip 1: Tech text items — tilted, moves right on scroll */}
      <div className="tilted-strip strip-1" style={{ transform: 'rotate(-3deg) scale(1.08)' }}>
        <div
          className="tilted-strip-track"
          style={{ transform: `translateX(${-strip1Offset}px)` }}
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
          style={{ transform: `translateX(${-strip2Offset}px)` }}
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
