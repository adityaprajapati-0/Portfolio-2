import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from './Navbar'

const HERO_DESCRIPTIONS = [
  "A 3D designer passionate\nabout crafting bold and\nmemorable projects 😉",
  "Building immersive digital\nexperiences through code\nand creative design ✨",
  "Transforming complex ideas\ninto stunning, high-impact\nvisual solutions 🎨"
]

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Typing animation state
  const [typedText, setTypedText] = useState('')
  const [started, setStarted] = useState(false)
  const [descIndex, setDescIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Mouse interactivity for mascot
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoothing the mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const mascotX = useSpring(mouseX, springConfig)
  const mascotY = useSpring(mouseY, springConfig)

  // Parallax transforms for mascot
  const rotateX = useTransform(mascotY, [-400, 400], [8, -8])
  const rotateY = useTransform(mascotX, [-400, 400], [-8, 8])

  // Looping Typewriter Effect
  useEffect(() => {
    if (!started) {
      const timer = setTimeout(() => setStarted(true), 1500)
      return () => clearTimeout(timer)
    }

    const currentFullText = HERO_DESCRIPTIONS[descIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (typedText.length < currentFullText.length) {
          setTypedText(currentFullText.slice(0, typedText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(currentFullText.slice(0, typedText.length - 1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setDescIndex((prev) => (prev + 1) % HERO_DESCRIPTIONS.length)
        }
      }
    }, isDeleting ? 30 : 50)

    return () => clearTimeout(timeout)
  }, [started, typedText, isDeleting, descIndex])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const moveX = clientX - window.innerWidth / 2
      const moveY = clientY - window.innerHeight / 2
      mouseX.set(moveX)
      mouseY.set(moveY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="hero-redesign" id="hero">
      <Navbar />

      <div className="hero-content-container">
        {/* Background Large Text */}
        <div className="hero-bg-text-container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-bg-title"
          >
            HI, I'M ADI
          </motion.h1>
        </div>

        {/* Mascot - Centered & Interactive */}
        <div className="hero-mascot-wrapper">
          <motion.div 
            className="hero-mascot-container"
            style={{
              x: useTransform(mascotX, (v) => v * 0.015), // Reduced from 0.04
              y: useTransform(mascotY, (v) => v * 0.015), // Reduced from 0.04
              rotateX,
              rotateY,
              transformPerspective: 1200
            }}
          >
            {/* 3D Platform/Base */}
            <div className="mascot-platform"></div>

            <div className="mascot-relative-container">
              <motion.img
                src="/hero-mascot/mascot-1.png"
                alt="Mascot"
                initial={{ y: 50, opacity: 0, translateZ: 0 }}
                animate={{ 
                  y: [0, -15, 0], 
                  opacity: 1,
                  translateZ: 100 // Visual depth separation
                }}
                transition={{ 
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 1, delay: 0.5 },
                  default: { duration: 1, delay: 0.5, ease: "easeOut" }
                }}
                className="hero-mascot-img"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
              />
              
              {/* Dynamic Lighting Overlay */}
              <motion.div 
                className="mascot-light-overlay"
                style={{
                  opacity: useTransform(mascotX, [-400, 400], [0.2, 0.6]),
                  background: useTransform(
                    mascotX, 
                    [-400, 400], 
                    [
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)'
                    ]
                  )
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>

        {/* Side Content */}
        <div className="hero-side-content">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-left-desc"
          >
            {typedText}
            {(isDeleting || typedText.length < HERO_DESCRIPTIONS[descIndex].length) && (
              <span className="hero-typing-cursor" />
            )}
          </motion.div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-right-cta"
          >
            <button className="hero-pill-btn" onClick={scrollToContact}>
              CONTACT ME <span>→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
