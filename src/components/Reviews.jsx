import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const REVIEWS_TOP = [
  { name: "John Smith", role: "CEO @ TechFlow", content: "Exceptional quality and attention to detail. The 3D models were exactly what we needed." },
  { name: "Sarah Chen", role: "Art Director", content: "Working with Aditya was a breeze. Extremely creative and delivered ahead of schedule." },
  { name: "Mike Ross", role: "Founder @ LegalTech", content: "The fullstack implementation was robust and scalable. Highly recommended for complex projects." },
  { name: "Elena K.", role: "Product Manager", content: "Stunning visuals and smooth interactions. Our conversion rates improved significantly." },
]

const REVIEWS_BOTTOM = [
  { name: "David G.", role: "Indie Dev", content: "The AI integration was seamless. A true expert in modern web technologies." },
  { name: "Lila Vance", role: "Creative Lead", content: "Transformed our vision into a digital masterpiece. The design is simply breathtaking." },
  { name: "Robert J.", role: "Marketing Head", content: "Professional, communicative, and talented. One of the best developers I've worked with." },
  { name: "Aria Thorne", role: "Studio Owner", content: "The level of craftsmanship in the 3D work is unmatched. Truly cinematic quality." },
]

export default function Reviews() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Spring for ultra-smooth transforms
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  })

  // Strip 1: Moves RIGHT (-300 to 300)
  const x1 = useTransform(smoothProgress, [0, 1], [-300, 300])
  
  // Strip 2: Moves LEFT (300 to -300)
  const x2 = useTransform(smoothProgress, [0, 1], [300, -300])

  return (
    <section className="reviews-section" ref={containerRef} id="reviews">
      <div className="reviews-inner">
        <h2 className="section-heading">CLIENTS SAY</h2>
        
        <div className="reviews-strips">
          {/* Tilted UP Stripe (Moves Right) */}
          <div className="reviews-strip strip-up">
            <motion.div className="reviews-track" style={{ x: x1 }}>
              {[...REVIEWS_TOP, ...REVIEWS_TOP].map((review, i) => (
                <div key={i} className="review-card">
                  <p className="review-content">"{review.content}"</p>
                  <div className="review-footer">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tilted DOWN Stripe (Moves Left) */}
          <div className="reviews-strip strip-down">
            <motion.div className="reviews-track" style={{ x: x2 }}>
              {[...REVIEWS_BOTTOM, ...REVIEWS_BOTTOM].map((review, i) => (
                <div key={i} className="review-card">
                  <p className="review-content">"{review.content}"</p>
                  <div className="review-footer">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
