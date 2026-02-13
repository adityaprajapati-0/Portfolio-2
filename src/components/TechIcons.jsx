import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion'

const TECH_ICONS = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
]

export default function TechIcons() {
  const containerRef = useRef(null)
  const doubledIcons = [...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Velocity-based move boost
  const scrollVelocity = useVelocity(scrollYProgress)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })

  // Base auto-scroll + speed boost from scrolling
  // We use a CSS animation for the base loop and Framer Motion for the boost
  const velocityFactor = useTransform(smoothVelocity, [0, 5], [1, 5], {
    clamp: false
  })

  return (
    <div className="tech-icons-strip-wrapper" ref={containerRef}>
      <div className="tech-icons-marquee">
        <motion.div 
          className="tech-icons-track"
          style={{ x: useTransform(scrollYProgress, [0, 1], [0, -1000]) }}
        >
          {doubledIcons.map((tech, index) => (
            <motion.div 
              key={`${tech.name}-${index}`} 
              className="tech-icon-item"
              initial={{ rotate: -5 }}
              animate={{ 
                rotate: [-5, 5, -5],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4 + (index % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
              <span className="tech-icon-name">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
